/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { 
  ClipboardList, 
  Calculator, 
  AlertCircle,
  Baby,
  Stethoscope,
  Zap,
  Droplets,
  Activity,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PediatricArrestSheet() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState<number>(0);

  const calculations = useMemo(() => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths += 12;
    }

    const totalMonths = ageYears * 12 + ageMonths;
    const effectiveWeight = weight > 0 ? weight : (ageYears < 1 ? (totalMonths / 2) + 4 : (ageYears * 2) + 8);

    // Equipment
    const ettUncuffed = ageYears < 2 ? (ageYears < 1 ? 3.5 : 4.0) : (ageYears / 4) + 4;
    const ettCuffed = ageYears < 2 ? (ageYears < 1 ? 3.0 : 3.5) : (ageYears / 4) + 3.5;
    const ettDepth = ettUncuffed * 3;
    
    let laryngoscope = 1;
    if (totalMonths < 1) laryngoscope = 0;
    else if (ageYears >= 2 && ageYears < 8) laryngoscope = 2;
    else if (ageYears >= 8) laryngoscope = 3;

    // Drugs
    const adrenaline = effectiveWeight * 0.1; // mL of 1:10,000
    const amiodarone = effectiveWeight * 5; // mg
    const atropine = Math.max(0.1, Math.min(0.5, effectiveWeight * 0.02)); // mg
    const bicarbonate = effectiveWeight * 1; // mL of 8.4%
    const calcium = effectiveWeight * 0.5; // mL of 10%
    const glucose = ageYears < 1 ? effectiveWeight * 5 : effectiveWeight * 2; // mL (D10W for infants, D25W for kids)
    const glucoseType = ageYears < 1 ? "Glicose 10%" : "Glicose 25%";

    // Electrical
    const defib1 = effectiveWeight * 2;
    const defib2 = effectiveWeight * 4;
    const cardioversion = effectiveWeight * 1;

    return {
      ageYears,
      ageMonths,
      totalMonths,
      effectiveWeight,
      equipment: {
        ettUncuffed: ettUncuffed.toFixed(1),
        ettCuffed: ettCuffed.toFixed(1),
        ettDepth: ettDepth.toFixed(1),
        laryngoscope,
        suction: (ettUncuffed * 2).toFixed(0),
        gastric: (effectiveWeight < 10 ? 8 : (effectiveWeight < 20 ? 10 : 12))
      },
      drugs: {
        adrenaline: adrenaline.toFixed(2),
        amiodarone: amiodarone.toFixed(1),
        atropine: atropine.toFixed(2),
        bicarbonate: bicarbonate.toFixed(1),
        calcium: calcium.toFixed(1),
        glucose: glucose.toFixed(1),
        glucoseType
      },
      electrical: {
        defib1: defib1.toFixed(0),
        defib2: defib2.toFixed(0),
        cardioversion: cardioversion.toFixed(0)
      }
    };
  }, [dob, weight]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;

    const now = new Date().toLocaleString("pt-BR");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Intubação e Parada Cardíaca - ${name || "Paciente"}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1e293b;
            padding: 20px;
            max-width: 100%;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page { margin: 12mm; size: A4 portrait; }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #10b981;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }
          .header h1 { font-size: 18px; color: #1e293b; margin: 0; }
          .header p { font-size: 11px; color: #64748b; margin-top: 2px; }
          .header-right { text-align: right; font-size: 10px; color: #64748b; }

          .badges {
            display: flex;
            gap: 10px;
            margin-bottom: 16px;
            flex-wrap: wrap;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .badge-age { background: #ecfdf5; color: #047857; border: 1px solid #d1fae5; }
          .badge-weight { background: #f0fdf4; color: #15803d; border: 1px solid #dcfce7; }
          .badge-estimated { font-size: 10px; color: #d97706; font-style: italic; }

          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }

          .section-title {
            font-size: 13px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .section-title .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
          }
          .dot-green { background: #10b981; }
          .dot-red { background: #ef4444; }
          .dot-amber { background: #f59e0b; }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
          }
          table tr { border-bottom: 1px solid #f1f5f9; }
          table tr:last-child { border-bottom: none; }
          table td { padding: 6px 10px; }
          table td:first-child { font-weight: 500; }
          table td:last-child { text-align: right; font-weight: 700; color: #059669; }

          .drug-highlight td { background: #fef2f2; }
          .drug-highlight td:first-child { color: #b91c1c; font-weight: 700; }
          .drug-highlight td:last-child { color: #b91c1c; }

          .electrical-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-top: 16px;
          }
          .electrical-card {
            padding: 10px;
            border-radius: 10px;
            text-align: center;
          }
          .electrical-card .label { font-size: 10px; font-weight: 600; margin-bottom: 4px; }
          .electrical-card .value { font-size: 22px; font-weight: 800; }
          .card-amber { background: #fffbeb; border: 1px solid #fde68a; }
          .card-amber .label { color: #a16207; }
          .card-amber .value { color: #78350f; }
          .card-orange { background: #fff7ed; border: 1px solid #fed7aa; }
          .card-orange .label { color: #c2410c; }
          .card-orange .value { color: #7c2d12; }
          .card-emerald { background: #ecfdf5; border: 1px solid #a7f3d0; }
          .card-emerald .label { color: #047857; }
          .card-emerald .value { color: #064e3b; }

          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            color: #94a3b8;
          }
          .footer strong { color: #475569; }
          .footer-brand { font-size: 9px; color: #cbd5e1; margin-top: 4px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>Intubação e Parada Cardíaca</h1>
            <p>Cálculos automáticos baseados em PALS/APLS</p>
          </div>
          <div class="header-right">
            <div>HSAP Intranet</div>
            <div>${now}</div>
          </div>
        </div>

        ${calculations ? `
          <div class="badges">
            <span class="badge badge-age">Idade: ${calculations.ageYears}a ${calculations.ageMonths}m</span>
            <span class="badge badge-weight">Peso: ${calculations.effectiveWeight.toFixed(1)} kg</span>
            ${weight === 0 ? '<span class="badge-estimated">⚠ Peso estimado</span>' : ''}
          </div>

          <div class="grid-2">
            <div>
              <div class="section-title"><span class="dot dot-green"></span> Equipamentos</div>
              <table>
                <tr><td>Tubo ET (Sem balonete)</td><td>${calculations.equipment.ettUncuffed}</td></tr>
                <tr><td>Tubo ET (Com balonete)</td><td>${calculations.equipment.ettCuffed}</td></tr>
                <tr><td>Fixação (Lábio)</td><td>${calculations.equipment.ettDepth} cm</td></tr>
                <tr><td>Laringoscópio (Lâmina)</td><td>${calculations.equipment.laryngoscope}</td></tr>
                <tr><td>Sonda de Aspiração</td><td>${calculations.equipment.suction} Fr</td></tr>
                <tr><td>Sonda Gástrica</td><td>${calculations.equipment.gastric} Fr</td></tr>
              </table>
            </div>

            <div>
              <div class="section-title"><span class="dot dot-red"></span> Drogas (Ressuscitação)</div>
              <table>
                <tr class="drug-highlight"><td>Adrenalina (1:10.000)</td><td>${calculations.drugs.adrenaline} mL</td></tr>
                <tr><td>Amiodarona (5mg/kg)</td><td>${calculations.drugs.amiodarone} mg</td></tr>
                <tr><td>Atropina (0,02mg/kg)</td><td>${calculations.drugs.atropine} mg</td></tr>
                <tr><td>Bicarbonato de Sódio 8,4%</td><td>${calculations.drugs.bicarbonate} mL</td></tr>
                <tr><td>Gluconato de Cálcio 10%</td><td>${calculations.drugs.calcium} mL</td></tr>
                <tr><td>${calculations.drugs.glucoseType}</td><td>${calculations.drugs.glucose} mL</td></tr>
              </table>
            </div>
          </div>

          <div class="section-title"><span class="dot dot-amber"></span> Terapia Elétrica</div>
          <div class="electrical-grid">
            <div class="electrical-card card-amber">
              <div class="label">1ª Carga (2 J/kg)</div>
              <div class="value">${calculations.electrical.defib1} J</div>
            </div>
            <div class="electrical-card card-orange">
              <div class="label">2ª Carga (4 J/kg)</div>
              <div class="value">${calculations.electrical.defib2} J</div>
            </div>
            <div class="electrical-card card-emerald">
              <div class="label">Cardioversão (1 J/kg)</div>
              <div class="value">${calculations.electrical.cardioversion} J</div>
            </div>
          </div>

          <div class="footer">
            <div>
              <span>Paciente: <strong>${name || "Não informado"}</strong></span>
              <div class="footer-brand">HSAP Intranet — Intubação e Parada Cardíaca (PALS/APLS)</div>
            </div>
            <span>Impresso em: ${now}</span>
          </div>
        ` : '<p>Nenhum cálculo gerado.</p>'}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div className="space-y-4 w-full m-0 p-0 print:p-0" id="pediatric-arrest-sheet">
      <Card className="border-none shadow-none bg-transparent print:bg-white pt-4 px-[5px] m-0">
        <CardHeader className="pt-0 pb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-100 p-1.5 rounded-lg print:hidden">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Intubação e Parada Cardíaca</CardTitle>
                <CardDescription className="text-xs">Cálculos automáticos baseados em PALS/APLS</CardDescription>
              </div>
            </div>
            {calculations && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="print:hidden gap-2 text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-800 transition-all rounded-lg shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Nome do Paciente</Label>
              <Input 
                id="name" 
                placeholder="Ex: João Silva" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="h-8 rounded-lg border-slate-200 text-sm"
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dob" className="text-xs">Data de Nascimento</Label>
              <Input 
                id="dob" 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)}
                className="h-8 rounded-lg border-slate-200 text-sm"
                autoComplete="off"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="weight" className="text-xs">Peso (kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                placeholder="Opcional" 
                value={weight || ""} 
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="h-8 rounded-lg border-slate-200 text-sm"
                autoComplete="off"
              />
            </div>
          </div>

          {!calculations ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Calculator className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm">Preencha a data de nascimento para gerar a folha</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Patient Summary */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border-emerald-100 text-xs">
                  <Baby className="w-3 h-3 mr-1.5" />
                  Idade: {calculations.ageYears}a {calculations.ageMonths}m
                </Badge>
                <Badge variant="outline" className="px-3 py-1 rounded-full bg-green-50 text-green-700 border-green-100 text-xs">
                  <Zap className="w-3 h-3 mr-1.5" />
                  Peso: {calculations.effectiveWeight.toFixed(1)} kg
                </Badge>
                {weight === 0 && (
                  <span className="text-[10px] text-amber-600 flex items-center gap-1 italic">
                    <AlertCircle className="w-2.5 h-2.5" />
                    Peso estimado
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Equipment Section */}
                <section className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    <h3>Equipamentos</h3>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                    <Table>
                      <TableBody>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Tubo ET (Sem balonete)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.ettUncuffed}</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Tubo ET (Com balonete)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.ettCuffed}</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Fixação (Lábio)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.ettDepth} cm</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Laringoscópio (Lâmina)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.laryngoscope}</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Sonda de Aspiração</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.suction} Fr</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Sonda Gástrica</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-emerald-600 text-xs">{calculations.equipment.gastric} Fr</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </section>

                {/* Drugs Section */}
                <section className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Droplets className="w-4 h-4 text-red-600" />
                    <h3>Drogas (Ressuscitação)</h3>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
                    <Table>
                      <TableBody>
                        <TableRow className="bg-red-50/30 h-8">
                          <TableCell className="py-1 px-3 font-bold text-red-700 text-xs">Adrenalina (1:10.000)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-red-700 text-xs">{calculations.drugs.adrenaline} mL</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Amiodarona (5mg/kg)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-xs">{calculations.drugs.amiodarone} mg</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Atropina (0,02mg/kg)</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-xs">{calculations.drugs.atropine} mg</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Bicarbonato de Sódio 8,4%</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-xs">{calculations.drugs.bicarbonate} mL</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">Gluconato de Cálcio 10%</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-xs">{calculations.drugs.calcium} mL</TableCell>
                        </TableRow>
                        <TableRow className="h-8">
                          <TableCell className="py-1 px-3 font-medium text-xs">{calculations.drugs.glucoseType}</TableCell>
                          <TableCell className="py-1 px-3 text-right font-bold text-xs">{calculations.drugs.glucose} mL</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </section>
              </div>

              {/* Electrical Therapy */}
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h3>Terapia Elétrica</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-amber-50 border-amber-100 shadow-none">
                    <CardHeader className="p-2 pb-1">
                      <CardDescription className="text-[10px] text-amber-700 font-medium">1ª Carga (2 J/kg)</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                      <p className="text-xl font-bold text-amber-900">{calculations.electrical.defib1} J</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-100 shadow-none">
                    <CardHeader className="p-2 pb-1">
                      <CardDescription className="text-[10px] text-orange-700 font-medium">2ª Carga (4 J/kg)</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                      <p className="text-xl font-bold text-orange-900">{calculations.electrical.defib2} J</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-50 border-emerald-100 shadow-none">
                    <CardHeader className="p-2 pb-1">
                      <CardDescription className="text-[10px] text-emerald-700 font-medium">Cardioversão (1 J/kg)</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                      <p className="text-xl font-bold text-emerald-900">{calculations.electrical.cardioversion} J</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
