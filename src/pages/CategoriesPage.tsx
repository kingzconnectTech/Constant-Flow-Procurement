"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  X,
  Building2,
  FileText,
  Sparkles,
  ChevronDown,
  Mail,
  Phone,
} from "lucide-react";
import DarkHeader from "../components/DarkHeader";
import Footer from "../components/ui/Footer";
import { RouterLink } from "../router";
import { useSEO } from "../hooks/useSEO";

import ballValveImg from "@/assets/Equipments/Ball Valves.jpg";
import butterflyValveImg from "@/assets/Equipments/Butterfly Valves.jpg";
import checkValveImg from "@/assets/Equipments/Check Valves.jpg";
import chokeValveImg from "@/assets/Equipments/Choke Valves.jpg";
import controlValveImg from "@/assets/Equipments/Control Valves.jpg";
import centrifugalPumpImg from "@/assets/Equipments/Centrifugal Pumps.jpg";
import posDispPumpImg from "@/assets/Equipments/Positive Displacement Pumps.jpg";
import reciproPumpImg from "@/assets/Equipments/Reciprocating Pumps.jpg";
import chemInjPumpImg from "@/assets/Equipments/Chemical Injection  Dosing Pumps.jpg";
import vacuumPumpImg from "@/assets/Equipments/Vacuum Pumps.jpg";
import alloyPipeImg from "@/assets/Equipments/Alloy Pipes.jpg";
import drillPipeImg from "@/assets/Equipments/Drill Pipe.jpg";
import flangesImg from "@/assets/Equipments/Flanges (Weld Neck, Slip-on, Blind, RTJ).jpg";
import pipeFittingsImg from "@/assets/Equipments/Pipe Fittings.jpg";
import screwFittingsImg from "@/assets/Equipments/Screwed  Socket Weld Fittings.jpg";
import pressureTransmittersImg from "@/assets/Equipments/Pressure Transmitters & Gauges.jpg";
import tempTransmittersImg from "@/assets/Equipments/Temperature Transmitters, RTDs, Thermocouples.jpg";
import flowMetersImg from "@/assets/Equipments/Flow Meters.jpg";
import levelTransmittersImg from "@/assets/Equipments/Level Transmitters.jpg";
import flowComputersImg from "@/assets/Equipments/Flow Computers.jpg";
import heatExchangersImg from "@/assets/Equipments/Heat Exchangers.jpg";
import tubeBundlesImg from "@/assets/Equipments/Tube Bundles.jpg";
import condenserImg from "@/assets/Equipments/condenser.png";
import coolingTowersImg from "@/assets/Equipments/Cooling Towers.jpg";
import boilersImg from "@/assets/Equipments/Boilers  HRSG.jpg";
import electricMotorImg from "@/assets/Equipments/Electric Motor.jpg";
import transformerImg from "@/assets/Equipments/transformer.png";
import generatorsImg from "@/assets/Equipments/Generators.jpg";
import circuitBreakersImg from "@/assets/Equipments/Circuit Breakers.jpg";
import switchgearImg from "@/assets/Equipments/Switchgear.jpg";
import chainPulleyImg from "@/assets/Equipments/Chain Pulley Blocks.jpg";
import electricChainHoistImg from "@/assets/Equipments/Electric Chain Hoists.jpg";
import wireRopeHoistImg from "@/assets/Equipments/Wire Rope Hoists.jpg";
import eotCranesImg from "@/assets/Equipments/Overhead  EOT Cranes.jpg";
import gantryCranesImg from "@/assets/Equipments/Gantry Cranes.jpg";
import excavatorImg from "@/assets/Equipments/excavator.png";
import bulldozersImg from "@/assets/Equipments/Bulldozers.jpg";
import wheelLoadersImg from "@/assets/Equipments/Wheel Loaders.jpg";
import backhoeLoadersImg from "@/assets/Equipments/Backhoe Loaders.jpg";
import skidSteerImg from "@/assets/Equipments/Skid Steer Loaders.jpg";
import motorGradersImg from "@/assets/Equipments/Motor Graders.jpg";
import wellheadImg from "@/assets/Equipments/Wellhead Assemblies.jpg";
import pigLaunchersImg from "@/assets/Equipments/Pig Launchers.jpg";
import meteringSkidsImg from "@/assets/Equipments/Metering Skids.jpg";
import fuelGasSkidsImg from "@/assets/Equipments/Fuel Gas Skids.jpg";
import safetyBarriersImg from "@/assets/Equipments/Safety Barriers.jpg";
import flameArrestorsImg from "@/assets/Equipments/Flame Arrestors.jpg";
import scaffoldingImg from "@/assets/Equipments/Scaffolding Systems.jpg";
import structuralSteelImg from "@/assets/Equipments/Structural Steel Sections.jpg";
import anchorBoltsImg from "@/assets/Equipments/Anchor Bolts.jpg";
import storageTankImg from "@/assets/Equipments/Storage Tank.png";
import pressureVesselImg from "@/assets/Equipments/Pressure Vessel.png";
import chemicalStorageImg from "@/assets/Equipments/Chemical Storage.png";
import waterStorageImg from "@/assets/Equipments/Water Storge.png";
import gasStorageImg from "@/assets/Equipments/Gas Storage.png";

/* ─── Types ─── */
type EquipmentItem = {
  id: string;
  name: string;
  modelNumber: string;
  category: string;
  brand: string;
  capacity: "Standard Duty" | "Heavy Duty" | "Severe Service / High Pressure" | "High Capacity";
  availability: "Ex-Stock Warehouse" | "Rapid Dispatch (1-2 Weeks)" | "Factory Built / Engineered";
  images: string[];
  description: string;
  overview: string;
  specs: { label: string; value: string }[];
  standards: string[];
  leadTime: string;
};

/* ─── 11 Official Categories (Clean, No Numeric Prefixes) ─── */
const CATEGORIES_LIST = [
  "Valves & Actuation",
  "Pumps, Compressors & Blowers",
  "Piping, Fittings & Tubing",
  "Instrumentation & Control",
  "Heat Transfer & Process Equipment",
  "Electrical & Power Equipment",
  "Material Handling Equipment (Hoists, Cranes & Lifting)",
  "Heavy Machinery & Earth-Moving Equipment",
  "Specialized Oil & Gas / Process Packages",
  "Safety, Structural & Consumables",
  "Storage",
] as const;

/* ─── Comprehensive Equipment Catalog (All 50 Items Without Omission) ─── */
const EQUIPMENT_CATALOG: EquipmentItem[] = [
  // ── 1. Valves & Actuation ──
  {
    id: "vlv-ball",
    name: "Ball Valves",
    modelNumber: "BV-API6D-TRUNNION-FLOAT",
    category: "Valves & Actuation",
    brand: "Cameron / Flowserve / Kitz Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [ballValveImg, checkValveImg],
    description: "Trunnion mounted and floating ball valves with fire-safe sealing, double block and bleed (DBB), and anti-blowout stem design.",
    overview: "Manufactured to API 6D and ASME B16.34 standards for high-pressure pipeline transmission, topsides, and refinery isolation. Available with metal-to-metal and soft seats.",
    specs: [
      { label: "Pressure Class", value: "ASME Class 150 to 2500 / API 10K" },
      { label: "Size Range", value: "1/2\" to 56\" (DN 15 - DN 1400)" },
      { label: "Body Materials", value: "WCB, LCC, A105N, 316SS, Duplex F51/F55" },
      { label: "Operation", value: "Lever, Worm Gear, Pneumatic, Electric" },
      { label: "Fire Rating", value: "API 607 / ISO 10497 / API 6FA" },
      { label: "Service", value: "Sour Gas (NACE MR0175), Cryogenic" },
    ],
    standards: ["API 6D", "ASME B16.34", "ISO 10497", "NACE MR0175", "API 607"],
    leadTime: "Ex-Stock Warehouse Supply",
  },
  {
    id: "vlv-butterfly",
    name: "Butterfly Valves",
    modelNumber: "BFV-TRIPLE-OFFSET-CRYO",
    category: "Valves & Actuation",
    brand: "Vanessa / Keystone / Bray Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [butterflyValveImg, ballValveImg],
    description: "Concentric, double-offset, and triple-offset metal-to-metal seated butterfly valves for zero-leakage throttling and isolation.",
    overview: "Non-rubbing triple eccentric geometry eliminates seat wear during quarter-turn travel, engineered for extreme temperatures, steam lines, and cryogenic LNG systems.",
    specs: [
      { label: "Pressure Rating", value: "Class 150, 300, 600, 900" },
      { label: "Size Range", value: "2\" to 64\" (DN 50 - DN 1600)" },
      { label: "Disc / Seat", value: "Stellite 21 Hardfaced Metal-to-Metal" },
      { label: "Temp Limits", value: "-196°C to +550°C" },
      { label: "Connections", value: "Wafer, Lugged, Flanged Short/Long" },
      { label: "Testing", value: "API 598 Zero Leakage Rate A" },
    ],
    standards: ["API 609 Cat B", "ASME B16.34", "BS 6364", "API 607"],
    leadTime: "1-2 Weeks Dispatch",
  },
  {
    id: "vlv-check",
    name: "Check Valves",
    modelNumber: "CHK-DUAL-PLATE-PISTON",
    category: "Valves & Actuation",
    brand: "Crane / Goodwin / Velan Spec",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [checkValveImg, ballValveImg],
    description: "Dual plate wafer check valves, swing check valves, non-slam nozzle check valves, and piston check valves for backflow prevention.",
    overview: "Rapid spring-assisted closure prevents hydraulic water hammer and protects rotating equipment in crude oil, steam, and water injection headers.",
    specs: [
      { label: "Valve Types", value: "Dual Plate, Swing, Nozzle Check, Piston" },
      { label: "Pressure Class", value: "ASME Class 150 to 2500" },
      { label: "Size Range", value: "1/2\" to 48\" (DN 15 - DN 1200)" },
      { label: "Materials", value: "A216 WCB, A352 LCC, A351 CF8M, Super Duplex" },
      { label: "Spring Material", value: "Inconel X-750 (High Temp / Sour)" },
      { label: "Design Spec", value: "API 594 / API 6D / ASME B16.34" },
    ],
    standards: ["API 594", "API 6D", "ASME B16.34", "NACE MR0175"],
    leadTime: "Ex-Stock Central Depot",
  },
  {
    id: "vlv-choke",
    name: "Choke Valves",
    modelNumber: "CHK-API6A-PRODUCTION",
    category: "Valves & Actuation",
    brand: "Master Flo / Cameron / Mokveld Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [chokeValveImg, controlValveImg],
    description: "Adjustable needle and external sleeve production choke valves engineered for erosive sand-laden wellhead fluids.",
    overview: "Built to API 6A with solid tungsten carbide wear trims, precise flow throttling characteristics, and options for manual micrometer or automated stepping actuators.",
    specs: [
      { label: "Working Pressure", value: "API 2,000 to 15,000 psi (1,034 bar)" },
      { label: "Nominal Bore", value: "2-1/16\" to 7-1/16\"" },
      { label: "Trim Metallurgy", value: "Solid Sintered Tungsten Carbide" },
      { label: "Material Class", value: "API Material Classes AA through HH" },
      { label: "Temp Class", value: "API Temp Ratings L through U (-46°C to +121°C)" },
      { label: "Actuation", value: "Manual Handwheel, Stepping Hydraulic / Electric" },
    ],
    standards: ["API 6A", "ISO 10423", "NACE MR0175", "API 17D"],
    leadTime: "Engineered-to-Order Skid",
  },
  {
    id: "vlv-control",
    name: "Control Valves",
    modelNumber: "CTL-GLOBE-SMART-POS",
    category: "Valves & Actuation",
    brand: "Fisher Emerson / Masoneilan Spec",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [controlValveImg, chokeValveImg],
    description: "Globe and rotary cage-guided control valves equipped with smart digital HART/Fieldbus positioners and anti-cavitation trims.",
    overview: "High-precision automated flow and pressure modulating valves featuring multi-stage pressure reduction trims to eliminate noise, cavitation, and flashing in severe process services.",
    specs: [
      { label: "Body Styles", value: "Globe (Single Seated, Balanced Cage), Rotary Angle" },
      { label: "Pressure Class", value: "ASME Class 150 to 2500" },
      { label: "Positioner", value: "Fisher FIELDVUE DVC6200 / Masoneilan SVI II" },
      { label: "Flow Characteristic", value: "Equal Percentage, Linear, Quick Opening" },
      { label: "Actuator", value: "Pneumatic Diaphragm, Piston, Electric" },
      { label: "Leakage Class", value: "ANSI / FCI 70-2 Class IV, V, VI (Bubble Tight)" },
    ],
    standards: ["IEC 60534", "ASME B16.34", "ISA Standards", "ATEX / IECEx"],
    leadTime: "Configured 1-2 Weeks",
  },

  // ── 2. Pumps, Compressors & Blowers ──
  {
    id: "pmp-centrifugal",
    name: "Centrifugal Pumps",
    modelNumber: "PMP-API610-OH2-BB2",
    category: "Pumps, Compressors & Blowers",
    brand: "Sulzer / Flowserve / KSB Spec",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [centrifugalPumpImg, posDispPumpImg],
    description: "API 610 overhung (OH2), between-bearing (BB2, BB3), and vertically suspended (VS4) centrifugal process pumps.",
    overview: "Centerline mounted heavy-duty casing designed for continuous operation at high temperatures and discharge heads, fitted with API 682 dual cartridge mechanical seals.",
    specs: [
      { label: "Standard", value: "API 610 11th / 12th Edition (ISO 13709)" },
      { label: "Flow Rate", value: "Up to 4,000 m³/h (17,600 GPM)" },
      { label: "Differential Head", value: "Up to 550 m (1,800 ft)" },
      { label: "Operating Temp", value: "-40°C to +450°C" },
      { label: "Materials", value: "API Classes S-6, C-6, A-8, D-1 (Duplex)" },
      { label: "Seal Support", value: "API 682 Plan 11, 21, 52, 53A/B" },
    ],
    standards: ["API 610", "ISO 13709", "API 682", "ATEX Directive"],
    leadTime: "1-2 Weeks / Configured Units",
  },
  {
    id: "pmp-pos-disp",
    name: "Positive Displacement Pumps",
    modelNumber: "PMP-PD-PROGRESSIVE-GEAR",
    category: "Pumps, Compressors & Blowers",
    brand: "PCM / Netzsch / Roper Spec",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [posDispPumpImg, centrifugalPumpImg],
    description: "Progressive cavity pumps, rotary gear pumps, and twin-screw pumps for highly viscous crude oils, sludges, and emulsions.",
    overview: "Constant non-pulsating flow with low shear rate and high self-priming suction lift, ideal for heavy crude oil transfer, bitumens, and multiphase fluid handling.",
    specs: [
      { label: "Pump Types", value: "Progressive Cavity, External Gear, Twin Screw" },
      { label: "Discharge Pressure", value: "Up to 72 bar (1,050 psi)" },
      { label: "Flow Range", value: "0.5 m³/h to 800 m³/h" },
      { label: "Viscosity Limits", value: "1 to 1,000,000 cSt (Heavy Bitumen)" },
      { label: "Stator / Rotor", value: "NBR, FKM, EPDM / Hard Chrome Plated Tool Steel" },
      { label: "Drive System", value: "Geared Motor with VFD Inverter" },
    ],
    standards: ["API 676", "ISO 9001", "CE Marked", "ATEX Zone 1/2"],
    leadTime: "Ex-Stock Central Depot",
  },
  {
    id: "pmp-reciprocating",
    name: "Reciprocating Pumps",
    modelNumber: "PMP-API674-TRIPLEX",
    category: "Pumps, Compressors & Blowers",
    brand: "National Oilwell Varco / FMC Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [reciproPumpImg, centrifugalPumpImg],
    description: "API 674 triplex and quintuplex heavy plunger pumps for high-pressure water injection, pipeline hydrotesting, and descaling.",
    overview: "Built with forged fluid cylinders, ceramic/tungsten plungers, and pressurized power-end lubrication for long service life under continuous extreme pressure.",
    specs: [
      { label: "Design Code", value: "API 674 3rd Edition" },
      { label: "Pressure Rating", value: "Up to 1,400 bar (20,000 psi)" },
      { label: "Brake Horsepower", value: "50 HP to 2,500 HP" },
      { label: "Fluid Cylinders", value: "Forged Carbon Steel, 316SS, Inconel" },
      { label: "Plunger Types", value: "Solid Ceramic, Tungsten Carbide Coated" },
      { label: "Lubrication", value: "Force-Feed Lube System with Oil Cooler" },
    ],
    standards: ["API 674", "ASME Standards", "NACE MR0175", "ATEX Certified"],
    leadTime: "Turnkey Power Skid Delivery",
  },
  {
    id: "pmp-chem-injection",
    name: "Chemical Injection / Dosing Pumps",
    modelNumber: "PMP-API675-DIAPHRAGM",
    category: "Pumps, Compressors & Blowers",
    brand: "Milton Roy / Lewa / Prominent Spec",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [chemInjPumpImg, posDispPumpImg],
    description: "Hydraulic diaphragm and packed plunger chemical dosing pumps for exact additive injection, odorization, and methanol service.",
    overview: "Hermetically sealed leak-proof double PTFE diaphragms with integrated rupture alert sensors and micrometer stroke adjustment per API 675 standards.",
    specs: [
      { label: "Design Standard", value: "API 675 Positive Displacement Controlled Volume" },
      { label: "Discharge Pressure", value: "Up to 500 bar (7,250 psi)" },
      { label: "Flow Capacity", value: "0.1 L/h to 3,500 L/h per Head" },
      { label: "Metering Precision", value: "±1% Flow Accuracy from 10% to 100% Stroke" },
      { label: "Wetted Materials", value: "316SS, Hastelloy C-276, Titanium, Alloy 20" },
      { label: "Motor Spec", value: "ATEX / IECEx Ex-d IIC T4, Variable Speed" },
    ],
    standards: ["API 675", "NACE MR0175", "ATEX Directive", "CE Marked"],
    leadTime: "In-Stock / Configured in 5 Days",
  },
  {
    id: "pmp-vacuum",
    name: "Vacuum Pumps",
    modelNumber: "VAC-LIQUID-RING-2STAGE",
    category: "Pumps, Compressors & Blowers",
    brand: "Nash / Busch / Gardner Denver Spec",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [vacuumPumpImg, centrifugalPumpImg],
    description: "Single and two-stage liquid ring vacuum pumps and rotary vane vacuum systems for vacuum distillation and flare gas recovery.",
    overview: "Capable of handling wet gas mixtures, condensable vapors, and carryover liquids without internal damage, operating isothermally for maximum plant safety.",
    specs: [
      { label: "Pump Technology", value: "Two-Stage Liquid Ring / Rotary Vane" },
      { label: "Suction Capacity", value: "50 m³/h to 10,000 m³/h" },
      { label: "Operating Vacuum", value: "Down to 33 mbar(a) (29 inHg Vac)" },
      { label: "Seal Liquid", value: "Water, Light Hydrocarbons, Glycols" },
      { label: "Casing & Rotor", value: "Ductile Iron, 316SS, Duplex Stainless" },
      { label: "Drive", value: "Direct Coupled Electric Motor / Belt Drive" },
    ],
    standards: ["HEI Standards", "ISO 9001", "ATEX Certified Zone 1/2"],
    leadTime: "1-2 Weeks Dispatch",
  },

  // ── 3. Piping, Fittings & Tubing ──
  {
    id: "pip-pipes",
    name: "Carbon Steel / Stainless Steel / Alloy Pipes",
    modelNumber: "PIP-API5L-ASTM-SMLS-WELD",
    category: "Piping, Fittings & Tubing",
    brand: "Vallourec / Tenaris / JFE Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [alloyPipeImg, drillPipeImg],
    description: "Seamless (SMLS) and welded (ERW, LSAW, SSAW) line pipes in carbon, low-temp alloy, stainless, duplex, and CRA clad grades.",
    overview: "100% non-destructive tested with full material traceability, Charpy impact tested down to -46°C, and certified to EN 10204 3.1 / 3.2 third-party inspection.",
    specs: [
      { label: "Grades", value: "API 5L X52/X65/X70/X80 (PSL2), ASTM A106 B, A333 Gr.6, A312 TP316L, UNS S31803" },
      { label: "Size Range", value: "1/2\" to 56\" Outer Diameter (OD)" },
      { label: "Wall Thickness", value: "SCH 10 through SCH XXS (up to 65 mm WT)" },
      { label: "Coating Systems", value: "3LPE, 3LPP, FBE, Internal Flow Efficiency, Bare" },
      { label: "Service", value: "Sour Service H2S Tested (NACE TM0284 HIC/SSCC)" },
      { label: "Certification", value: "EN 10204 3.1 / 3.2 (DNV, BV, SGS, Lloyd's)" },
    ],
    standards: ["API 5L PSL2", "ASTM A106", "ASTM A312", "ASTM A333", "NACE MR0175"],
    leadTime: "Immediate Yard Stock",
  },
  {
    id: "pip-drill-pipe",
    name: "Drill Pipe",
    modelNumber: "DP-API5DP-HIGH-TORQUE",
    category: "Piping, Fittings & Tubing",
    brand: "NOV Grant Prideco / Vallourec Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [drillPipeImg, alloyPipeImg],
    description: "API Spec 5DP and proprietary high-torque double-shoulder tool joint drill pipes, heavy-weight drill pipes (HWDP), and drill collars.",
    overview: "Engineered for extended-reach drilling (ERD), high-angle directional wells, and deepwater exploration with smooth hardbanding and internal plastic coating.",
    specs: [
      { label: "API Spec", value: "API Spec 5DP / PSL 1, 2, 3" },
      { label: "Grades", value: "E-75, X-95, G-105, S-135, High Strength 140/150 ksi" },
      { label: "OD Range", value: "2-7/8\", 3-1/2\", 4\", 5\", 5-1/2\", 6-5/8\"" },
      { label: "Tool Joints", value: "NC38, NC50, 5-1/2 FH, Double-Shoulder High Torque" },
      { label: "Hardbanding", value: "Arnco 100XT / 300XT, TCS-Titanium, Castolin" },
      { label: "Internal Coating", value: "TK-34XT, DPC, Tuboscope Coating" },
    ],
    standards: ["API Spec 5DP", "API RP 7G", "NS-1 Certified", "DS-1 Cat 3-5"],
    leadTime: "Regional Yard Warehouse Supply",
  },
  {
    id: "pip-flanges",
    name: "Flanges (Weld Neck, Slip-on, Blind, RTJ)",
    modelNumber: "FLG-ASME-WN-BLIND-RTJ",
    category: "Piping, Fittings & Tubing",
    brand: "Melesi / Galperti / ULMA Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [flangesImg, alloyPipeImg],
    description: "High-yield forged steel Weld Neck, Slip-On, Blind, Socket Weld, Lap Joint, and RTJ ring joint flanges per ASME B16.5 & B16.47.",
    overview: "Manufactured from normalized forged billets with precision CNC machined facings, high impact properties, and strict dimensional tolerances for leak-free flanged spool connections.",
    specs: [
      { label: "Flange Types", value: "Weld Neck (WN), Slip-on (SO), Blind (BL), RTJ, Swivel" },
      { label: "Pressure Rating", value: "ASME Class 150, 300, 600, 900, 1500, 2500" },
      { label: "Size Range", value: "1/2\" to 60\" (ASME B16.5 & B16.47 Series A / B)" },
      { label: "Forging Grades", value: "ASTM A105N, A350 LF2, A694 F52/F65/F70, A182 F316L/F51" },
      { label: "Facing", value: "Raised Face (RF 125-250 AARH), RTJ Ring Groove, Flat Face" },
      { label: "Testing", value: "100% MPI, Ultrasonic, Hardness Test per NACE" },
    ],
    standards: ["ASME B16.5", "ASME B16.47", "MSS-SP-44", "NACE MR0175", "ASTM A105"],
    leadTime: "Immediate Ex-Stock Dispatch",
  },
  {
    id: "pip-fittings",
    name: "Pipe Fittings (Elbows, Tees, Reducers, Caps)",
    modelNumber: "FIT-ASME-B16.9-BUTTWELD",
    category: "Piping, Fittings & Tubing",
    brand: "TK Corporation / Mega / Benkan Spec",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [pipeFittingsImg, flangesImg],
    description: "Seamless and welded factory-made wrought carbon, alloy, and stainless steel butt-weld pipe fittings per ASME B16.9 and MSS-SP-75.",
    overview: "Includes 45° and 90° long/short radius elbows, straight and reducing tees, concentric and eccentric reducers, and weld caps with beveled ends for pressure piping.",
    specs: [
      { label: "Fitting Types", value: "45°/90°/180° Elbows (LR/SR), Equal/Reducing Tees, Concentric/Eccentric Reducers, Caps" },
      { label: "Size Range", value: "1/2\" to 48\" (DN 15 - DN 1200)" },
      { label: "Wall Schedule", value: "SCH 10 through SCH XXS (matched to pipe bore)" },
      { label: "Material Grades", value: "ASTM A234 WPB/WPC, A420 WPL6, A860 WPHY 52/65/70, A403 WP316L" },
      { label: "End Finish", value: "Beveled Ends (ASME B16.25) with Root Face" },
      { label: "Quality Checks", value: "100% Radiography / Ultrasonic, PMI Tested" },
    ],
    standards: ["ASME B16.9", "MSS-SP-75", "ASME B16.25", "NACE MR0175"],
    leadTime: "Immediate Warehouse Supply",
  },
  {
    id: "pip-socket-weld",
    name: "Screwed / Socket Weld Fittings",
    modelNumber: "FIT-ASME-B16.11-3000-6000",
    category: "Piping, Fittings & Tubing",
    brand: "Both-Well / Bonney Forge Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [screwFittingsImg, pipeFittingsImg],
    description: "Forged high-pressure 3000#, 6000#, and 9000# socket weld and NPT threaded couplings, elbows, unions, swage nipples, and weldolets.",
    overview: "Precision forged branch connections, sockolets, threadolets, and unions manufactured from solid forgings for high-integrity small-bore piping connections.",
    specs: [
      { label: "Pressure Class", value: "Class 3000#, 6000#, 9000#" },
      { label: "Fitting Types", value: "90°/45° Elbows, Tees, Crosses, Couplings, Half Couplings, Caps, Unions, Weldolets, Sockolets" },
      { label: "Size Range", value: "1/8\" to 4\" (DN 6 - DN 100)" },
      { label: "Threading", value: "ASME B1.20.1 NPT, ISO 7-1 BSPT" },
      { label: "Materials", value: "ASTM A105N, A350 LF2, A182 F316L, Alloy 400" },
      { label: "Design Code", value: "ASME B16.11 / MSS-SP-97" },
    ],
    standards: ["ASME B16.11", "MSS-SP-97", "MSS-SP-83", "ASME B1.20.1"],
    leadTime: "In-Stock Warehouse Supply",
  },

  // ── 4. Instrumentation & Control ──
  {
    id: "ins-pressure",
    name: "Pressure Transmitters & Gauges",
    modelNumber: "PT-HART-SMART-DP-GP",
    category: "Instrumentation & Control",
    brand: "Emerson Rosemount / Yokogawa / ABB Spec",
    capacity: "Standard Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [pressureTransmittersImg, levelTransmittersImg],
    description: "Digital HART and Foundation Fieldbus gauge, absolute, and differential pressure transmitters with integrated digital indicators.",
    overview: "0.04% reference accuracy with ultra-low thermal drift, SIL 2/3 functional safety certification, and Hastelloy/Monel isolation diaphragms for corrosive process monitoring.",
    specs: [
      { label: "Accuracy", value: "±0.04% of Calibrated Span" },
      { label: "Span Limits", value: "0.1 inH2O to 15,000 psi (1,000 bar)" },
      { label: "Communication", value: "HART 7, WirelessHART, Foundation Fieldbus, Modbus" },
      { label: "Explosion-Proof", value: "ATEX / IECEx Ex db IIC T6, Ex ia Intrinsically Safe" },
      { label: "Diaphragm", value: "Hastelloy C-276, 316L SS, Monel 400, Tantalum" },
      { label: "Gauges Included", value: "Solid-Front Safety Pattern SS Pressure Gauges" },
    ],
    standards: ["IEC 61508 SIL 2/3", "ATEX / IECEx", "HART Protocol", "ISO 9001"],
    leadTime: "Pre-Configured 5-7 Days",
  },
  {
    id: "ins-temperature",
    name: "Temperature Transmitters, RTDs, Thermocouples",
    modelNumber: "TT-RTD-TC-THERMOWELL",
    category: "Instrumentation & Control",
    brand: "Emerson Rosemount / WIKA Spec",
    capacity: "Standard Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [tempTransmittersImg, pressureTransmittersImg],
    description: "Head-mounted and field-mount smart temperature transmitters paired with duplex Pt100 RTDs, Type K/J thermocouples, and drilled barstock thermowells.",
    overview: "Sensor backup and drift alert redundancy with wake frequency calculation per ASME PTC 19.3 TW for thermowell resonance safety in high-velocity steam and gas headers.",
    specs: [
      { label: "Sensor Elements", value: "Duplex 3-Wire / 4-Wire Pt100 RTD (Class A), Type K/J/N Thermocouples" },
      { label: "Temperature Range", value: "-200°C to +1,200°C" },
      { label: "Thermowell Design", value: "Solid Drilled Barstock (Flanged / Threaded / Van Stone)" },
      { label: "Thermowell Metal", value: "316SS, Inconel 600/625, Hastelloy C, Duplex" },
      { label: "Transmitter Output", value: "4-20 mA with Superimposed HART Digital Signal" },
      { label: "Safety Rating", value: "SIL 2 / SIL 3 Certified" },
    ],
    standards: ["IEC 60751 (RTD)", "IEC 60584 (TC)", "ASME PTC 19.3 TW", "ATEX Ex-d"],
    leadTime: "1-2 Weeks Built to Process Spec",
  },
  {
    id: "ins-flowmeters",
    name: "Flow Meters (Orifice, Ultrasonic, Magnetic, Coriolis)",
    modelNumber: "FM-CORIOLIS-US-MAG-ORIFICE",
    category: "Instrumentation & Control",
    brand: "Micro Motion / Krohne / Endress+Hauser Spec",
    capacity: "High Capacity",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [flowMetersImg, flowComputersImg],
    description: "Direct Coriolis mass flowmeters, multipath ultrasonic custody transfer meters, electromagnetic flowmeters, and ASME orifice plate meter runs.",
    overview: "Certified for fiscal custody transfer of crude oil, natural gas, LNG, and industrial chemical dosing with OIML R117 and API MPMS international approvals.",
    specs: [
      { label: "Technologies", value: "Coriolis Mass, Multi-Path Ultrasonic, Magnetic, Orifice Meter Runs" },
      { label: "Accuracy", value: "±0.05% Mass (Liquid), ±0.2% Volume (Gas), ±0.2% Mag" },
      { label: "Line Sizes", value: "DN 15 (1/2\") up to DN 1200 (48\")" },
      { label: "Pressure Rating", value: "Class 150 up to Class 2500 (400 bar)" },
      { label: "Approvals", value: "OIML R117, MID Class 0.3, API MPMS Chapter 5" },
      { label: "Diagnostics", value: "Smart Meter Verification & Void Fraction Detection" },
    ],
    standards: ["OIML R117", "API MPMS", "AGA Report 9/11", "ATEX Zone 0/1"],
    leadTime: "Configured 2 Weeks",
  },
  {
    id: "ins-level",
    name: "Level Transmitters, Switches & Gauges",
    modelNumber: "LVL-RADAR-DISPLACER-MAGNETIC",
    category: "Instrumentation & Control",
    brand: "Magnetrol / VEGA / Rosemount Spec",
    capacity: "Standard Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [levelTransmittersImg, pressureTransmittersImg],
    description: "Non-contact 80GHz radar, guided wave radar (GWR), torque tube displacer transmitters, magnetic level gauges, and vibrating tuning fork switches.",
    overview: "Reliable level and interface measurement in high-pressure separators, knockout drums, and chemical tanks unaffected by changing density, foaming, or turbulence.",
    specs: [
      { label: "Measuring Principle", value: "80GHz FMCW Radar, Guided Wave Radar, Magnetic Chamber Gauge, Displacer" },
      { label: "Accuracy", value: "±1 mm Radar / ±0.1% Full Scale" },
      { label: "Operating Range", value: "Up to 120 meters (393 ft)" },
      { label: "Pressure / Temp", value: "Full Vacuum to 400 bar / -196°C to +450°C" },
      { label: "Chamber Materials", value: "Carbon Steel, 316SS, Hastelloy, Titanium" },
      { label: "Interface Measurement", value: "Oil/Water Hydrocarbon Emulsion Interface Capable" },
    ],
    standards: ["IEC 61508 SIL 2/3", "ATEX / IECEx", "NACE MR0175", "ASME B31.3"],
    leadTime: "1-2 Weeks Dispatch",
  },
  {
    id: "ins-flow-computers",
    name: "Flow Computers",
    modelNumber: "FC-MULTI-STREAM-FISCAL",
    category: "Instrumentation & Control",
    brand: "OMNI / Dynamic / Emerson FloBoss Spec",
    capacity: "Standard Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [flowComputersImg, flowMetersImg],
    description: "Dedicated multi-stream fiscal custody-transfer flow computers for gas and liquid metering skids with audit trail logging.",
    overview: "Executes real-time calculations according to AGA 3/7/8/9/11, API MPMS, ISO 5167, and GPA 2172 standards with secure tamper-proof audit trails and prover interface.",
    specs: [
      { label: "Calculations", value: "AGA-3, AGA-7, AGA-8, AGA-9, AGA-11, API MPMS Ch. 11/12" },
      { label: "Meter Streams", value: "Up to 4 Dual-Direction Meter Runs + Prover" },
      { label: "Communication", value: "Modbus TCP/IP, Serial RS485, Ethernet, OPC Server" },
      { label: "Audit Logging", value: "API 21.1 / 21.2 Compliant Hourly & Daily Logs" },
      { label: "Accuracy", value: "Calculated Precision Exceeds 0.001%" },
      { label: "Enclosure", value: "19\" Rack Mount or Wall-Mounted IP65 Cabinet" },
    ],
    standards: ["API 21.1 / 21.2", "AGA Standards", "OIML R117", "ISO 5167"],
    leadTime: "Pre-Configured 5-7 Days",
  },

  // ── 5. Heat Transfer & Process Equipment ──
  {
    id: "hea-exchangers",
    name: "Heat Exchangers (Shell & Tube, Plate)",
    modelNumber: "HEX-TEMA-R-PLATE-ASME",
    category: "Heat Transfer & Process Equipment",
    brand: "Alfa Laval / Koch Heat / Tranter Spec",
    capacity: "Heavy Duty",
    availability: "Factory Built / Engineered",
    images: [heatExchangersImg, tubeBundlesImg],
    description: "TEMA R shell & tube, gasketed plate, and welded bloc heat exchangers designed for high thermal loads and refinery service.",
    overview: "Built to ASME Section VIII Div 1 and TEMA R with high heat transfer coefficients, removable tube bundles, and metallurgy tailored for sour crude and corrosive acids.",
    specs: [
      { label: "Exchanger Types", value: "Shell & Tube (AES, BEM, BEU, CFU), Gasketed Plate, Welded Compabloc" },
      { label: "Design Codes", value: "ASME Section VIII Div 1 & 2, TEMA Class R, API 660" },
      { label: "Design Pressure", value: "Full Vacuum to 300 bar (4,350 psi)" },
      { label: "Heat Transfer Area", value: "10 m² to 6,000 m² per Shell" },
      { label: "Tube Materials", value: "Carbon Steel, Stainless 316L, Duplex 2205, Titanium, Hastelloy" },
      { label: "NDT Testing", value: "100% Radiography, Helium Mass Spectrometer, Hydrostatic" },
    ],
    standards: ["ASME VIII Div 1/2", "TEMA R", "API 660", "PED 2014/68/EU", "NACE MR0175"],
    leadTime: "Modular Skid Engineered to Order",
  },
  {
    id: "hea-tube-bundles",
    name: "Tube Bundles",
    modelNumber: "TBDL-REPLACE-UTUBE-STRAIGHT",
    category: "Heat Transfer & Process Equipment",
    brand: "Thermal Engineering Specialty Supply",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [tubeBundlesImg, heatExchangersImg],
    description: "Custom engineered replacement U-tube and straight-tube bundles for existing heat exchangers and process condensers.",
    overview: "Supplied with precision drilled and grooved tubesheets, carbon/stainless baffles, seal-welded or hydraulic roller-expanded tube-to-tubesheet joints, and hydrostatic testing.",
    specs: [
      { label: "Configurations", value: "U-Tube Bundles, Floating Head (TEMA S/T), Fixed Tubesheet" },
      { label: "Tube OD Sizes", value: "5/8\", 3/4\", 1\", 1-1/4\", 1-1/2\" Seamless & Welded" },
      { label: "Tubesheet Materials", value: "A105N, A350 LF2, A182 F316L, Titanium Clad, Duplex Clad" },
      { label: "Baffle Geometry", value: "Single Segmental, Double Segmental, Rod Baffle" },
      { label: "Tube-to-Sheet Joint", value: "Strength Welded + Expanded per ASME Section VIII" },
      { label: "Inspection", value: "Eddy Current Testing, Hydrostatic Pressure Test" },
    ],
    standards: ["TEMA Class R/C/B", "ASME Section VIII Div. 1", "API 660"],
    leadTime: "Fast-Track Turnaround 1-3 Weeks",
  },
  {
    id: "hea-condensers",
    name: "Condensers",
    modelNumber: "CND-SURFACE-STEAM-PROCESS",
    category: "Heat Transfer & Process Equipment",
    brand: "GEA / SPX / Graham Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [condenserImg, tubeBundlesImg],
    description: "Main turbine surface condensers, overhead hydrocarbon vapor condensers, and vacuum steam condensation modules.",
    overview: "High-vacuum steam surface condensers engineered for combined-cycle power plants and refinery distillation overheads with integrated non-condensable gas evacuation ejectors.",
    specs: [
      { label: "Condenser Type", value: "Surface Steam Condenser, Barometric, Overhead Vapor" },
      { label: "Vacuum Level", value: "0.04 to 0.08 bar(a) Operating Pressure" },
      { label: "Steam Flow", value: "10,000 kg/h to 500,000 kg/h" },
      { label: "Cooling Medium", value: "Seawater, Fresh Cooling Tower Water, Air Cooled" },
      { label: "Tube Metallurgy", value: "Titanium Gr. 2 (Seawater), Admiralty Brass, 316L SS" },
      { label: "Hotwell Storage", value: "Integrated Retention Hotwell with Level Control" },
    ],
    standards: ["HEI Standards for Steam Surface Condensers", "ASME VIII", "TEMA Standards"],
    leadTime: "Project Engineered Delivery",
  },
  {
    id: "hea-cooling-towers",
    name: "Cooling Towers",
    modelNumber: "CTW-INDUCED-DRAFT-FRP",
    category: "Heat Transfer & Process Equipment",
    brand: "Marley SPX / Baltimore Aircoil Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [coolingTowersImg, condenserImg],
    description: "Counterflow and crossflow induced-draft industrial cooling towers with non-corrosive FRP structure and high-efficiency film fill.",
    overview: "Designed for extreme ambient heat and industrial plant heat rejection with low-drift droplet eliminators, variable speed fan drives, and epoxy/FRP corrosion protection.",
    specs: [
      { label: "Structure", value: "Pultruded Fiber-Reinforced Polymer (FRP) / Heavy Concrete" },
      { label: "Water Flow Range", value: "200 m³/h to 15,000 m³/h per Cell" },
      { label: "Drift Loss", value: "< 0.001% of Circulating Water Flow" },
      { label: "Fan Assembly", value: "Aerodynamic Adjustable Pitch Glass-Reinforced Blades" },
      { label: "Drive System", value: "Right-Angle Geared Drive / Direct Drive VFD" },
      { label: "Fill Pack", value: "Anti-Clog High Temperature PVC / Polypropylene Film" },
    ],
    standards: ["CTI Standard 201", "NFPA 214", "ISO 14001"],
    leadTime: "Modular Construction Delivery",
  },
  {
    id: "hea-boilers",
    name: "Boilers / HRSG",
    modelNumber: "BLR-WATERTUBE-HRSG-PACKAGE",
    category: "Heat Transfer & Process Equipment",
    brand: "Babcock & Wilcox / Cleaver-Brooks Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [boilersImg, coolingTowersImg],
    description: "Industrial package water-tube steam boilers, firetube utility boilers, and Heat Recovery Steam Generators (HRSG).",
    overview: "Complete packaged steam generation plants equipped with low-NOx dual-fuel burners, economizers, deaerators, and burner management systems (BMS) for petrochemical utilities.",
    specs: [
      { label: "Steam Capacity", value: "5 Ton/h to 150 Ton/h (10,000 to 330,000 lb/hr)" },
      { label: "Steam Pressure", value: "10 bar to 100 bar (150 psi to 1,450 psi)" },
      { label: "Steam Temp", value: "Saturated Steam up to 520°C Superheated" },
      { label: "Fuel System", value: "Natural Gas, Refinery Off-Gas, Heavy Fuel Oil, Diesel" },
      { label: "Thermal Efficiency", value: "> 94% with Integrated Economizer / Air Preheater" },
      { label: "Safety Standards", value: "ASME Section I Power Boilers, NFPA 85 BMS" },
    ],
    standards: ["ASME Section I & VIII", "NFPA 85", "NBIC", "PED 2014/68/EU"],
    leadTime: "Turnkey Package Steam Plant",
  },

  // ── 6. Electrical & Power Equipment ──
  {
    id: "ele-motors",
    name: "Electric Motors (Induction, Explosion-proof)",
    modelNumber: "MTR-LV-MV-EXD-IE3-IE4",
    category: "Electrical & Power Equipment",
    brand: "Siemens / ABB / WEG Spec",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [electricMotorImg, switchgearImg],
    description: "Low and medium voltage squirrel-cage induction motors in flameproof (Ex-d) and increased safety (Ex-eb) enclosures.",
    overview: "Heavy cast iron ribbed frame with Class H insulation, IP66 sealing, insulated bearings for inverter duty (VFD), and integrated PT100 temperature monitoring.",
    specs: [
      { label: "Power Output", value: "0.55 kW to 4,000 kW (0.75 HP to 5,500 HP)" },
      { label: "Voltage Ratings", value: "400V, 480V, 690V, 3.3 kV, 6.6 kV, 11 kV (50/60 Hz)" },
      { label: "Hazardous Class", value: "ATEX / IECEx Ex db eb IIC T4 Gb" },
      { label: "Efficiency", value: "IE3 Premium / IE4 Super Premium per IEC 60034-30" },
      { label: "Ingress Rating", value: "IP66 / NEMA 4X Cast Iron Construction" },
      { label: "VFD Suitability", value: "Inverter Duty Rated with Insulated NDE Bearing" },
    ],
    standards: ["IEC 60034", "IEC 60079-0/1", "IEEE 841", "ATEX Directive"],
    leadTime: "In-Stock / 1-2 Weeks Dispatch",
  },
  {
    id: "ele-transformers",
    name: "Transformers (Power & Distribution)",
    modelNumber: "TRF-OIL-CAST-RESIN-33KV",
    category: "Electrical & Power Equipment",
    brand: "Schneider / ABB / Siemens Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [transformerImg, electricMotorImg],
    description: "Cast resin dry-type transformers, hermetically sealed oil-immersed distribution transformers, and substation power transformers.",
    overview: "Engineered for harsh offshore platforms and utility substations with low loss cores, step-lap silicon steel laminations, and on-load tap changers (OLTC).",
    specs: [
      { label: "Capacity Range", value: "100 kVA to 63 MVA" },
      { label: "Primary Voltages", value: "3.3 kV, 6.6 kV, 11 kV, 22 kV, 33 kV, 66 kV, 132 kV" },
      { label: "Secondary Voltage", value: "400V, 415V, 480V, 690V, 11 kV" },
      { label: "Types Available", value: "Cast Resin Dry-Type (F1/E2/C2) & Mineral / Ester Oil Filled" },
      { label: "Cooling Class", value: "ONAN / ONAF (Oil), AN / AF (Dry Type)" },
      { label: "Monitoring", value: "Buchholz Relay, Oil Temperature, Winding PT100s, Pressure Relief" },
    ],
    standards: ["IEC 60076", "IEEE C57.12", "ISO 14001", "CE Marked"],
    leadTime: "Factory Built / Scheduled Shipment",
  },
  {
    id: "ele-generators",
    name: "Generators (Diesel, Gas, Steam)",
    modelNumber: "GEN-CONTAINER-DIESEL-GAS",
    category: "Electrical & Power Equipment",
    brand: "Cummins / Caterpillar / MTU Spec",
    capacity: "High Capacity",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [generatorsImg, transformerImg],
    description: "Containerized prime and continuous industrial diesel generator sets, natural gas gen-sets, and steam turbine generators.",
    overview: "Heavy-duty sound-attenuated ISO containerized generator packages equipped with digital paralleling switchgear, automatic transfer switches (ATS), and remote telemetry.",
    specs: [
      { label: "Power Ratings", value: "250 kVA to 3,500 kVA per Single Unit (Multi-Megawatt Arrays)" },
      { label: "Fuel Options", value: "Diesel, Natural Gas, Field Gas, Dual Fuel" },
      { label: "Alternator Spec", value: "Brushless, PMG Excitation, Class H, IP23" },
      { label: "Controller", value: "Deep Sea / ComAp Paralleling Power Management" },
      { label: "Enclosure", value: "ISO 20ft/40ft Heavy Soundproof (68 dBA @ 7m)" },
      { label: "Emissions", value: "EPA Tier 2 / Tier 4 Final / EU Stage V" },
    ],
    standards: ["ISO 8528", "IEC 60034", "NFPA 110", "CE Compliant"],
    leadTime: "1-2 Weeks Regional Yard Dispatch",
  },
  {
    id: "ele-circuit-breakers",
    name: "Circuit Breakers",
    modelNumber: "CB-VACUUM-AIR-MCCB",
    category: "Electrical & Power Equipment",
    brand: "ABB / Schneider / Siemens Spec",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [circuitBreakersImg, switchgearImg],
    description: "Medium-voltage vacuum circuit breakers (VCB), low-voltage air circuit breakers (ACB), and molded case circuit breakers (MCCB).",
    overview: "Withdrawable high breaking capacity circuit breakers equipped with electronic microprocessor trip units (LSI/LSIG), arc flash reduction maintenance switches, and Modbus communications.",
    specs: [
      { label: "Breaker Types", value: "Medium Voltage Vacuum (VCB), Air (ACB), Molded Case (MCCB)" },
      { label: "Voltage Ratings", value: "Up to 1,000V (LV) / Up to 36 kV (MV)" },
      { label: "Rated Current", value: "16A up to 6,300A Frame Ratings" },
      { label: "Breaking Capacity", value: "Up to 150 kA @ 415V / Up to 50 kA @ 12 kV" },
      { label: "Trip Unit", value: "Microprocessor RMS Sensing with Overload, Short-Circuit, Ground Fault" },
      { label: "Mounting", value: "Drawout / Withdrawable & Fixed Type" },
    ],
    standards: ["IEC 60947-2", "IEC 62271-100", "ANSI / IEEE C37", "UL 489"],
    leadTime: "In-Stock Warehouse Supply",
  },
  {
    id: "ele-switchgear",
    name: "Switchgear & MCC Panels",
    modelNumber: "SWG-LV-MV-FORM4B-IMCC",
    category: "Electrical & Power Equipment",
    brand: "Schneider / ABB / Siemens Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [switchgearImg, circuitBreakersImg],
    description: "Arc-resistant metal-clad MV switchgear panels and intelligent Low-Voltage Motor Control Centers (iMCC) Form 4b.",
    overview: "Engineered for maximum operator safety with internal arc classification (IAC AFLR), withdrawable functional units, integrated VFD modules, and Ethernet SCADA communications.",
    specs: [
      { label: "Voltage Class", value: "LV up to 690V / MV 3.3 kV to 33 kV" },
      { label: "Busbar System", value: "High-Conductivity Copper Busbars up to 6,300A" },
      { label: "Short-Circuit Level", value: "50 kA / 65 kA / 100 kA for 1 sec / 3 sec" },
      { label: "Segregation Form", value: "Form 3b / Form 4b Type 7 Separation" },
      { label: "Arc Classification", value: "IAC AFLR Certified to IEC 62271-200" },
      { label: "Motor Control", value: "DOL, Star-Delta, Soft Starter, Variable Frequency Drive (VFD)" },
    ],
    standards: ["IEC 61439-1/2", "IEC 62271-200", "UL 845", "NEMA ICS"],
    leadTime: "Factory Engineered Lineup",
  },

  // ── 7. Material Handling Equipment (Hoists, Cranes & Lifting) ──
  {
    id: "mat-chain-pulley",
    name: "Chain Pulley Blocks / Manual Chain Hoists",
    modelNumber: "HST-MANUAL-CHAIN-EX",
    category: "Material Handling Equipment (Hoists, Cranes & Lifting)",
    brand: "Yale / Harrington / Vital Spec",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [chainPulleyImg, electricChainHoistImg],
    description: "Heavy-duty manual chain pulley blocks and lever hoists with overload protection and ATEX spark-proof bronze alloy hooks.",
    overview: "Impact-resistant steel housing, double-pawl automatic mechanical brake, Grade 80/100 alloy load chain, and copper/bronze coated hooks for Zone 1 offshore maintenance.",
    specs: [
      { label: "Lifting Capacity", value: "0.5 Ton to 30 Ton (500 kg to 30,000 kg)" },
      { label: "Standard Lift Height", value: "3m, 6m, 9m, 12m (Custom Chains Available)" },
      { label: "Load Chain", value: "Grade 80 / Grade 100 Heat Treated Alloy Steel (Zinc Plated)" },
      { label: "Braking System", value: "Weston Style Double Pawl Automatic Load Brake" },
      { label: "Explosion-Proof", value: "ATEX Zone 1 Certified Spark-Resistant Construction" },
      { label: "Safety Feature", value: "Integrated Slip Clutch Overload Limiter" },
    ],
    standards: ["ASME B30.16", "EN 13157", "ATEX 2014/34/EU", "OSHA 1910.179"],
    leadTime: "Ex-Stock Warehouse Dispatch",
  },
  {
    id: "mat-elec-chain-hoist",
    name: "Electric Chain Hoists",
    modelNumber: "HST-ELECTRIC-CHAIN-2SPD",
    category: "Material Handling Equipment (Hoists, Cranes & Lifting)",
    brand: "Demag / Konecranes / Stahl Spec",
    capacity: "Heavy Duty",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [electricChainHoistImg, wireRopeHoistImg],
    description: "Dual-speed and variable speed electric chain hoists with motorized monorail trolleys for workstation and shop-floor lifting.",
    overview: "Equipped with precision helical gearboxes, low-voltage 24V ergonomic push-button pendants, thermal motor overload protection, and upper/lower safety limit switches.",
    specs: [
      { label: "Load Capacity", value: "250 kg to 10,000 kg (0.25 Ton to 10 Ton)" },
      { label: "Lifting Speed", value: "Dual Speed (e.g. 8/2 m/min) / Inverter Controlled" },
      { label: "Power Supply", value: "380V - 480V, 3-Phase, 50/60 Hz" },
      { label: "Trolley Types", value: "Push Trolley, Geared Trolley, Electric Motorized Trolley" },
      { label: "Duty Rating", value: "FEM 2m / ISO M5 (Heavy Duty Cycle)" },
      { label: "Protection", value: "IP55 Standard / IP66 Outdoor / ATEX Zone 1/2" },
    ],
    standards: ["FEM 9.511", "ASME B30.16", "EN 14492-2", "CE Certified"],
    leadTime: "1-2 Weeks Dispatch",
  },
  {
    id: "mat-wire-rope-hoist",
    name: "Wire Rope Hoists",
    modelNumber: "HST-WIRE-ROPE-LOW-HEADROOM",
    category: "Material Handling Equipment (Hoists, Cranes & Lifting)",
    brand: "Konecranes / Demag / SWF Spec",
    capacity: "High Capacity",
    availability: "Rapid Dispatch (1-2 Weeks)",
    images: [wireRopeHoistImg, electricChainHoistImg],
    description: "Low-headroom and standard-headroom modular electric wire rope hoists for overhead bridge cranes and monorails.",
    overview: "Compact design maximizing hook lift height with high-tensile rotation-resistant wire ropes, DC disc brakes, integrated load cell telemetry, and variable frequency drive (VFD).",
    specs: [
      { label: "Capacity Range", value: "2 Ton to 80 Ton" },
      { label: "Height of Lift", value: "6m up to 60m" },
      { label: "Rope Specification", value: "High-Tensile Galvanized Rotation-Resistant Steel Wire" },
      { label: "Brake Type", value: "Fail-Safe DC Electromagnetic Disc Brake" },
      { label: "Monitoring", value: "Real-Time Digital Load Display with Overload Cutoff" },
      { label: "Drive Control", value: "Stepless Inverter Drive for Hoist & Cross Travel" },
    ],
    standards: ["FEM 1.001", "ASME B30.16", "EN 13001", "ISO 4301"],
    leadTime: "1-2 Weeks from Assembly Depot",
  },
  {
    id: "mat-eot-cranes",
    name: "Overhead / EOT Cranes",
    modelNumber: "CRN-EOT-DOUBLE-GIRDER",
    category: "Material Handling Equipment (Hoists, Cranes & Lifting)",
    brand: "Konecranes / Demag / Street Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [eotCranesImg, gantryCranesImg],
    description: "Single and double girder Electric Overhead Traveling (EOT) cranes with auxiliary hoists and operator cab/radio control.",
    overview: "Engineered for turbine halls, heavy fabrication yards, and pipe mills with anti-sway software, box-girder structural rigidity, and full runway conductor rail electrification.",
    specs: [
      { label: "Lifting Capacity", value: "5 Ton to 250 Ton (Main Hook + Auxiliary Hook)" },
      { label: "Span Length", value: "10 meters to 42 meters" },
      { label: "Duty Classification", value: "FEM 2m/3m/4m, ISO M5 to M8 (Severe Duty)" },
      { label: "Control System", value: "Dual Wireless Remote Bellybox + Enclosed Air-Conditioned Cab" },
      { label: "Travel Speeds", value: "Variable Inverter: Hoist 0-10 m/min, Bridge 0-40 m/min" },
      { label: "Safety Systems", value: "Optical Anti-Collision, Overload Alarm, Emergency Stop" },
    ],
    standards: ["ASME B30.2", "EN 13001", "CMAA Spec 70/74", "OSHA 1910.179"],
    leadTime: "Custom Engineered Project Delivery",
  },
  {
    id: "mat-gantry-cranes",
    name: "Gantry Cranes",
    modelNumber: "CRN-GANTRY-RAIL-RUBBER",
    category: "Material Handling Equipment (Hoists, Cranes & Lifting)",
    brand: "Liebherr / Konecranes / ZPMC Spec",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [gantryCranesImg, eotCranesImg],
    description: "Rail-Mounted Gantry (RMG) cranes, Rubber-Tyred Gantry (RTG) cranes, and semi-gantry workshop outdoor cranes.",
    overview: "Heavy outdoor stockyard and shipyard gantry cranes featuring storm anchoring wind clamps, motorized cable reels, and precision spreader/hook attachments.",
    specs: [
      { label: "Capacity Range", value: "10 Ton to 300 Ton" },
      { label: "Rail Span", value: "15 meters to 65 meters with Cantilever Overhangs" },
      { label: "Lifting Height", value: "9 meters to 30 meters Above Ground" },
      { label: "Power Feed", value: "Motorized Spring/Motor Cable Reel or Onboard Diesel Gen" },
      { label: "Wind Protection", value: "Automated Rail Clamps & Hydraulic Storm Anchors" },
      { label: "Electrics", value: "Fully Air-Conditioned Electrical E-House with PLC Control" },
    ],
    standards: ["ASME B30.17", "FEM 1.001", "EN 13001", "ISO 12100"],
    leadTime: "Engineered Heavy Installation",
  },

  // ── 8. Heavy Machinery & Earth-Moving Equipment ──
  {
    id: "hvy-excavators",
    name: "Excavators",
    modelNumber: "EXC-CAT-KOMATSU-20T-90T",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Caterpillar / Komatsu / Hitachi OEM",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [excavatorImg, wheelLoadersImg],
    description: "Medium and heavy hydraulic crawler excavators and wheeled excavators with severe-duty rock buckets and auxiliary piping.",
    overview: "Equipped with Tier 4 Final / Stage V clean diesel engines, electro-hydraulic load-sensing hydraulics, ROPS/FOPS reinforced soundproof cabins, and factory GPS telematics.",
    specs: [
      { label: "Operating Weight", value: "20,000 kg to 90,000 kg (44,000 lb - 198,000 lb)" },
      { label: "Engine Power", value: "120 kW to 450 kW (160 HP to 600 HP)" },
      { label: "Bucket Capacity", value: "1.2 m³ to 6.0 m³ Heavy Duty Rock Bucket" },
      { label: "Digging Depth", value: "6.5 m to 9.2 m Max Digging Depth" },
      { label: "Auxiliary Piping", value: "High-Pressure Hammer & Shear Dual Circuit Lines" },
      { label: "Emission Tier", value: "EPA Tier 4 Final / EU Stage V" },
    ],
    standards: ["ISO 12100", "ISO 3471 (ROPS)", "ISO 3449 (FOPS)", "CE Certified"],
    leadTime: "Regional Yard Inventory Supply",
  },
  {
    id: "hvy-bulldozers",
    name: "Bulldozers / Dozers",
    modelNumber: "DOZ-TRACK-SEMI-U-RIPPER",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Caterpillar / Komatsu OEM",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [bulldozersImg, excavatorImg],
    description: "Heavy track-type crawler tractors with Semi-Universal (SU) blades, single/multi-shank rippers, and elevated sprockets.",
    overview: "Built for heavy pipeline right-of-way site grading, mining haul roads, and bulk rock ripping with automated blade assist and heavy-duty sealed track undercarriages.",
    specs: [
      { label: "Machine Class", value: "Cat D6, D8T, D9, D10T / Komatsu D155, D275, D375" },
      { label: "Operating Weight", value: "24,000 kg to 70,000 kg (53,000 lb - 154,000 lb)" },
      { label: "Blade Options", value: "Semi-Universal (SU), Universal (U), Straight (S) Blade" },
      { label: "Ripper System", value: "Single-Shank Deep Ripper (with pin puller) or Multi-Shank" },
      { label: "Transmission", value: "Electronically Controlled Power Shift (4-Speed Planetary)" },
      { label: "Cabin", value: "Isolated ROPS/FOPS Air-Conditioned Cab with Air-Ride Seat" },
    ],
    standards: ["ISO 3471 (ROPS)", "ISO 3449 (FOPS)", "EPA Tier 4 Final", "CE Compliant"],
    leadTime: "Immediate Logistics Dispatch",
  },
  {
    id: "hvy-wheel-loaders",
    name: "Wheel Loaders",
    modelNumber: "WHL-ARTICULATED-ROCK-BUCKET",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Caterpillar / Komatsu / Volvo OEM",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [wheelLoadersImg, bulldozersImg],
    description: "Heavy-duty articulated four-wheel drive wheel loaders with high breakout force for aggregate quarries and bulk loading.",
    overview: "Z-bar linkage kinematics, automatic power-shift transmissions, ride control suspension, and heavy rock spade buckets for rapid truck loading and stockpile handling.",
    specs: [
      { label: "Operating Weight", value: "18,000 kg to 55,000 kg (40,000 lb - 120,000 lb)" },
      { label: "Bucket Capacity", value: "3.5 m³ to 9.0 m³ (4.5 yd³ to 11.8 yd³)" },
      { label: "Net Engine Power", value: "180 kW to 400 kW (240 HP to 540 HP)" },
      { label: "Payload Capacity", value: "6,000 kg to 20,000 kg per Pass" },
      { label: "Braking System", value: "Full Hydraulic Enclosed Wet Disc Brakes" },
      { label: "Steering", value: "Articulated Center Pivot with ±40° Steering Angle" },
    ],
    standards: ["ISO 12100", "ISO 3471 (ROPS)", "EPA Tier 4 / Stage V", "CE Certified"],
    leadTime: "Regional Yard Warehouse Supply",
  },
  {
    id: "hvy-backhoes",
    name: "Backhoe Loaders",
    modelNumber: "BHL-4WD-TURBO-EXTENDA",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Caterpillar / JCB / Case OEM",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [backhoeLoadersImg, wheelLoadersImg],
    description: "Versatile four-wheel drive backhoe loaders with extendable dippers, 4-in-1 multi-purpose front buckets, and auxiliary tool hydraulics.",
    overview: "Compact multi-purpose utility earthmover featuring pilot excavator joystick controls, powershift transmission, and heavy side-shift or center-pivot outriggers.",
    specs: [
      { label: "Engine Power", value: "75 kW to 85 kW (100 HP to 115 HP) Turbocharged" },
      { label: "Operating Weight", value: "8,500 kg to 10,500 kg (18,700 lb - 23,100 lb)" },
      { label: "Loader Bucket", value: "1.0 m³ to 1.3 m³ 4-in-1 Clamshell Bucket" },
      { label: "Digging Depth", value: "4.3 m Standard / 5.7 m with Extendable Dipper" },
      { label: "Drive Configuration", value: "4WD / 4WS with Differential Lock" },
      { label: "Hydraulic System", value: "Variable Displacement Piston Pump (165 L/min)" },
    ],
    standards: ["ISO 12100", "ROPS/FOPS ISO 3471", "EPA Tier 4 / Stage V"],
    leadTime: "Immediate Ex-Stock Dispatch",
  },
  {
    id: "hvy-skid-steer",
    name: "Skid Steer Loaders",
    modelNumber: "SSL-COMPACT-TRACK-WHEEL",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Bobcat / Caterpillar / Kubota OEM",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [skidSteerImg, backhoeLoadersImg],
    description: "Compact wheeled and rubber-tracked skid steer loaders (CTL) with high-flow auxiliary hydraulics for trenching, sweeping, and lifting.",
    overview: "High-torque compact loader capable of 360-degree zero-radius turning, vertical lift path loader arms, enclosed pressurized cabin, and universal quick-tach attachment coupler.",
    specs: [
      { label: "Rated Operating Cap", value: "1,000 kg to 2,200 kg (2,200 lb - 4,850 lb)" },
      { label: "Traction Types", value: "Heavy-Duty Rubber Tracks (CTL) or Pneumatic/Solid Tires" },
      { label: "Engine Output", value: "55 kW to 75 kW (74 HP to 100 HP) Tier 4 Diesel" },
      { label: "Auxiliary Hydraulics", value: "High-Flow up to 150 L/min @ 240 bar for Trenchers/Augers" },
      { label: "Lift Geometry", value: "Vertical Lift Path for High Dump Clearance" },
      { label: "Operator Station", value: "Pressurized Sealed Cab with HVAC & Joysticks" },
    ],
    standards: ["ISO 12100", "ISO 3471 (ROPS)", "CE Compliant", "Tier 4 Final"],
    leadTime: "Immediate Regional Delivery",
  },
  {
    id: "hvy-graders",
    name: "Motor Graders",
    modelNumber: "GRD-ALL-WHEEL-DRIVE-14FT",
    category: "Heavy Machinery & Earth-Moving Equipment",
    brand: "Caterpillar / Komatsu OEM",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [motorGradersImg, bulldozersImg],
    description: "All-wheel drive motor graders with 14ft/16ft moldboards, front scarifiers, and rear rippers for precision pipeline road grading.",
    overview: "Equipped with advanced electro-hydraulic joystick controls, automated 3D cross-slope grade control, differential lock, and circle-drive slip clutch protection.",
    specs: [
      { label: "Machine Models", value: "Cat 140, 150, 160 / Komatsu GD655, GD675" },
      { label: "Operating Weight", value: "18,000 kg to 26,000 kg (40,000 lb - 57,000 lb)" },
      { label: "Moldboard Blade", value: "4.2 m (14 ft) or 4.8 m (16 ft) Heavy Duty Blade" },
      { label: "Engine Power", value: "160 kW to 220 kW (215 HP to 300 HP)" },
      { label: "Drive System", value: "6x4 Standard or 6x6 All-Wheel Drive (AWD)" },
      { label: "Grade Control", value: "Factory Pre-Wired for Trimble / Topcon 3D GPS" },
    ],
    standards: ["ISO 12100", "ISO 3471 (ROPS)", "EPA Tier 4 / Stage V", "CE Certified"],
    leadTime: "Regional Yard Warehouse Supply",
  },

  // ── 9. Specialized Oil & Gas / Process Packages ──
  {
    id: "pkg-wellhead",
    name: "Wellhead Assemblies / Christmas Trees",
    modelNumber: "WHD-API6A-5K-15K-SURFACE",
    category: "Specialized Oil & Gas / Process Packages",
    brand: "Cameron / SLB / Baker Hughes Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [wellheadImg, pigLaunchersImg],
    description: "API Spec 6A surface wellhead systems, casing heads, tubing spools, and complete Christmas tree valve assemblies.",
    overview: "Engineered for high-pressure sour gas (H2S), CO2 flooding, and water injection with metal-to-metal sealing, gate valves, choke valves, and PR2 qualification testing.",
    specs: [
      { label: "Working Pressure", value: "3,000 psi to 15,000 psi (207 bar to 1,034 bar)" },
      { label: "Material Class", value: "API Material Classes AA, BB, CC, DD, EE, FF, HH" },
      { label: "Temperature Rating", value: "API Temp Classes K through V (-60°C to +180°C)" },
      { label: "Product Spec Level", value: "PSL 1, PSL 2, PSL 3, PSL 3G, PSL 4" },
      { label: "Valves Included", value: "Master Valves, Wing Valves, Swab Valve, Production Choke" },
      { label: "Testing & Validation", value: "API 6A Appendix F PR2 Qualified Validation" },
    ],
    standards: ["API Spec 6A", "ISO 10423", "NACE MR0175", "API 14D / 6AV1"],
    leadTime: "Turnkey Pre-Tested Assembly",
  },
  {
    id: "pkg-pig-traps",
    name: "Pig Launchers & Receivers",
    modelNumber: "PIG-TRAP-ASME8-QOC",
    category: "Specialized Oil & Gas / Process Packages",
    brand: "Pipeline Engineering Specialty Supply",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [pigLaunchersImg, wellheadImg],
    description: "ASME Section VIII coded pipeline pig launcher and receiver scraper traps with Quick Opening Closures (QOC).",
    overview: "Supplied as complete skid-mounted packages with pig signallers, bypass piping, kicker lines, pressure safety relief, and interlocked safety bleed systems.",
    specs: [
      { label: "Pipe Sizes", value: "4\" to 56\" (DN 100 - DN 1400)" },
      { label: "Pressure Rating", value: "ASME Class 150 through Class 2500" },
      { label: "Closure Type", value: "Band-Lock / Clamp Ring Quick Opening Closure (QOC)" },
      { label: "Design Code", value: "ASME Section VIII Div 1 & ASME B31.4 / B31.8" },
      { label: "Accessories", value: "Intrusive / Non-Intrusive Pig Signallers, Jib Crane, Tray" },
      { label: "Service Type", value: "Crude Oil, Refined Products, Wet/Sour Natural Gas" },
    ],
    standards: ["ASME VIII Div 1", "ASME B31.4 / B31.8", "NACE MR0175", "API 5L"],
    leadTime: "Modular Skid Engineered to Spec",
  },
  {
    id: "pkg-metering-skids",
    name: "Metering Skids",
    modelNumber: "SKD-CUSTODY-TRANSFER-FISCAL",
    category: "Specialized Oil & Gas / Process Packages",
    brand: "Constantflow Engineered Package",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [meteringSkidsImg, fuelGasSkidsImg],
    description: "Turnkey multi-stream fiscal custody-transfer gas and liquid hydrocarbon metering skids with integrated master meter / bidirectional prover loop.",
    overview: "Factory acceptance tested (FAT) modular skid featuring ultrasonic / Coriolis flowmeters, online gas chromatographs, flow computers, and motor-operated valves.",
    specs: [
      { label: "Fluid Services", value: "Crude Oil, Condensate, Natural Gas, LPG, LNG, Ethylene" },
      { label: "Fiscal Accuracy", value: "Compliant with OIML R117 (Liquid) & AGA Report 9 (Gas)" },
      { label: "Meter Streams", value: "N+1 Redundant Meter Runs with Automated Stream Switching" },
      { label: "Instrumentation", value: "Coriolis / Ultrasonic Meters, Dual Pressure & Temp Transmitters" },
      { label: "Prover Interface", value: "Compact Prover / Bi-Directional Pipe Prover Integration" },
      { label: "Automation", value: "OMNI / FloBoss Flow Computer Cabinet with Remote SCADA" },
    ],
    standards: ["API MPMS", "OIML R117", "AGA 3/7/9/11", "ASME B31.3", "ATEX Zone 1"],
    leadTime: "Complete Turnkey Skid Delivery",
  },
  {
    id: "pkg-fuel-gas",
    name: "Fuel Gas Skids",
    modelNumber: "SKD-FUEL-GAS-HEATING-REG",
    category: "Specialized Oil & Gas / Process Packages",
    brand: "Constantflow Engineered Package",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [fuelGasSkidsImg, meteringSkidsImg],
    description: "Custom packaged fuel gas conditioning, electric/water-bath heating, coalescing filtration, and dual pressure reduction skids.",
    overview: "Protects high-efficiency gas turbines and power plant engines by eliminating aerosols and liquid droplets, maintaining superheat dew point margin, and regulating pressure.",
    specs: [
      { label: "Gas Flow Capacity", value: "5,000 Nm³/h to 200,000 Nm³/h" },
      { label: "Filtration", value: "Dual Filter Separators / Coalescers (99.9% Removal > 0.3 µm)" },
      { label: "Gas Heating", value: "Explosion-Proof Electric Circulation Heater or Water Bath" },
      { label: "Pressure Control", value: "Active / Monitor Pressure Regulating Valve Stream" },
      { label: "Piping Code", value: "ASME B31.3 Process Piping (Full Radiography)" },
      { label: "Safety System", value: "Emergency Slam-Shut Valves (SSV) + Pressure Relief" },
    ],
    standards: ["ASME B31.3", "API 14C", "ASME VIII Div 1", "ATEX 2014/34/EU"],
    leadTime: "Pre-Piped & Tested Skid Delivery",
  },

  // ── 10. Safety, Structural & Consumables ──
  {
    id: "saf-barriers",
    name: "Safety Barriers / Isolators",
    modelNumber: "SAF-ISOLATOR-CRASH-BARRIER",
    category: "Safety, Structural & Consumables",
    brand: "MTL / Pepperl+Fuchs / Armco Spec",
    capacity: "Standard Duty",
    availability: "Ex-Stock Warehouse",
    images: [safetyBarriersImg, flameArrestorsImg],
    description: "Intrinsically safe galvanic isolators, zener safety barriers, and heavy galvanized industrial vehicle crash/perimeter barriers.",
    overview: "Complete plant safety line spanning electrical intrinsic safety signal isolators for explosive Zone 0/1 areas, and hot-dip galvanized structural crash protection barriers.",
    specs: [
      { label: "Galvanic Isolators", value: "Analog Input/Output, Discrete Relay, Temp Transmitter Isolators" },
      { label: "Intrinsic Safety", value: "ATEX / IECEx [Ex ia Ga] IIC for Zone 0/1 Field Devices" },
      { label: "Crash Barriers", value: "Hot-Dip Galvanized W-Beam / Armco Industrial Impact Barriers" },
      { label: "Mounting Options", value: "DIN-Rail Module (35mm) / Bolt-Down Concrete Posts" },
      { label: "Functional Safety", value: "SIL 2 / SIL 3 Certified Hardware per IEC 61508" },
      { label: "Corrosion Finish", value: "Hot Dip Galvanized per ISO 1461 (100+ Micron Zinc)" },
    ],
    standards: ["IEC 61508 SIL 2/3", "ATEX / IECEx", "ISO 1461", "EN 1317 Crash Test"],
    leadTime: "Ex-Stock Warehouse Supply",
  },
  {
    id: "saf-flame-arrestors",
    name: "Flame Arrestors",
    modelNumber: "SAF-FLAME-DETONATION-ATEX",
    category: "Safety, Structural & Consumables",
    brand: "Protectoseal / Elmac / Groth Spec",
    capacity: "Severe Service / High Pressure",
    availability: "Ex-Stock Warehouse",
    images: [flameArrestorsImg, safetyBarriersImg],
    description: "In-line deflagration and detonation flame arrestors and atmospheric end-of-line breather vent flame arrestors.",
    overview: "Crimp ribbon stainless steel matrix element quenches high-velocity supersonic detonation flame fronts in flare lines, vapor recovery units (VRU), and storage tank vents.",
    specs: [
      { label: "Arrestor Type", value: "In-Line Detonation, In-Line Deflagration, End-of-Line Vent" },
      { label: "Explosion Group", value: "Gas Groups IIA, IIB3, IIC (Hydrogen Rated)" },
      { label: "Flange Sizes", value: "DN 25 (1\") to DN 600 (24\") ASME Class 150" },
      { label: "Element Material", value: "Stainless Steel 316L, Hastelloy C-276, Monel" },
      { label: "Body Metallurgy", value: "Carbon Steel WCB, Stainless Steel CF8M / 316L" },
      { label: "Certification", value: "Tested per ISO 16852 / ATEX 2014/34/EU Directive" },
    ],
    standards: ["ISO 16852", "ATEX Directive", "USCG 33 CFR 154", "NFPA 69"],
    leadTime: "Immediate Warehouse Stock",
  },
  {
    id: "saf-scaffolding",
    name: "Scaffolding Systems",
    modelNumber: "SCF-RINGLOCK-CUPLOCK-HEAVY",
    category: "Safety, Structural & Consumables",
    brand: "Layher / PERI / Altrad Spec",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [scaffoldingImg, structuralSteelImg],
    description: "Modular Ringlock, Cuplock, and tube-and-clamp hot-dip galvanized heavy-duty industrial scaffolding systems.",
    overview: "Pre-engineered for refinery shutdown maintenance and offshore platform access with high load capacity, steel plank walkboards, toe boards, and drop-forged couplers.",
    specs: [
      { label: "System Types", value: "Ringlock Allround, Cuplock System, BS1139 Tube & Fittings" },
      { label: "Steel Grade", value: "High-Strength S355 Structural Steel (48.3 mm OD x 3.2 mm)" },
      { label: "Galvanizing", value: "Hot-Dip Galvanized to BS EN ISO 1461 (Min 70 Microns)" },
      { label: "Load Capacity", value: "Class 6 Heavy Duty (up to 6.0 kN/m² Working Load)" },
      { label: "Components", value: "Standards, Ledgers, Diagonal Braces, Steel Planks, Stair Towers" },
      { label: "Couplers", value: "Drop-Forged Right Angle, Swivel, Sleeve Couplers per EN 74" },
    ],
    standards: ["EN 12810-1", "EN 12811-1", "BS 1139", "EN 74-1", "OSHA 1926.451"],
    leadTime: "High-Volume Stock Yard Supply",
  },
  {
    id: "saf-structural-steel",
    name: "Structural Steel Sections",
    modelNumber: "STR-S355ML-BEAMS-PLATES",
    category: "Safety, Structural & Consumables",
    brand: "ArcelorMittal / Dillinger / POSCO Spec",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [structuralSteelImg, scaffoldingImg],
    description: "Wide-flange beams (HEB, HEA, IPE, UB/UC), hollow structural sections (HSS), and heavy structural steel plates with Z35 ductility.",
    overview: "Thermo-mechanically rolled structural steel with Charpy V-notch toughness tested down to -50°C for offshore module jackets, refinery pipe racks, and crane runway girders.",
    specs: [
      { label: "Product Forms", value: "HEB, HEA, IPE, Universal Beams/Columns, Square/Rectangular HSS, Heavy Plates" },
      { label: "Material Grades", value: "EN 10025-4 S355ML, S460ML, ASTM A572 Gr. 50, ASTM A36" },
      { label: "Through-Thickness", value: "Z25 / Z35 Certified (Resistant to Lamellar Tearing per EN 10164)" },
      { label: "Plate Thickness", value: "6 mm to 150 mm Heavy Plates (with 100% UT testing)" },
      { label: "Surface Finish", value: "Shot Blasted SA 2.5 + Inorganic Zinc Silicate Primer" },
      { label: "Certification", value: "100% Heat Traceable Mill Test Certificate EN 10204 3.2" },
    ],
    standards: ["EN 10025-4", "EN 10225 Offshore", "API 2H / 2W", "ASTM A572", "NORSOK M-120"],
    leadTime: "Immediate Stock Yard Delivery",
  },
  {
    id: "saf-anchor-bolts",
    name: "Anchor Bolts & Foundation Bolts",
    modelNumber: "BLT-FOUNDATION-ANCHOR-L-J",
    category: "Safety, Structural & Consumables",
    brand: "High-Tensile Fasteners Specialist Supply",
    capacity: "Heavy Duty",
    availability: "Ex-Stock Warehouse",
    images: [anchorBoltsImg, structuralSteelImg],
    description: "High-strength foundation anchor bolts, L-type & J-type bent bolts, sleeve anchor assemblies, and heavy hex structural stud bolts.",
    overview: "Engineered for vessel skirts, heavy equipment baseplates, and structural steel column footings with hot-dip galvanized and fluoropolymer PTFE anti-corrosion coatings.",
    specs: [
      { label: "Bolt Types", value: "L-Type, J-Type, Plate-Welded Anchor Bolts, Sleeve Anchors, All-Thread Rods" },
      { label: "Diameter Range", value: "M12 to M100 (1/2\" to 4\" Diameter)" },
      { label: "Material Grades", value: "ASTM F1554 (Gr. 36, 55, 105), ASTM A193 B7/B7M, ISO 898-1 Class 8.8 / 10.9" },
      { label: "Corrosion Finish", value: "Hot-Dip Galvanized (ASTM A153), Xylan / PTFE Coated, Zinc-Nickel" },
      { label: "Nut & Washer", value: "Heavy Hex Nuts (ASTM A194 2H) + Hardened Washers (ASTM F436)" },
      { label: "Traceability", value: "Head-Stamped Heat Numbers with 3.1 Mill Test Reports" },
    ],
    standards: ["ASTM F1554", "ASTM A193 / A194", "ISO 898-1", "ASTM F436"],
    leadTime: "Immediate Warehouse Supply",
  },

  // ── 11. Storage ──
  {
    id: "stg-storage-tanks",
    name: "Storage Tanks",
    modelNumber: "TNK-ATMOS-API650-VS",
    category: "Storage",
    brand: "Constantflow Engineered Package",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [storageTankImg, pressureVesselImg],
    description: "Atmospheric and low-pressure above-ground storage tanks for crude oil, refined products, chemicals, and water — designed to API 650 / API 620 standards.",
    overview: "Fabricated from carbon steel, stainless steel, or FRP with epoxy linings, cathodic protection systems, floating roofs, fixed cone roofs, and internal coatings per product compatibility requirements.",
    specs: [
      { label: "Tank Types", value: "Vertical Cylindrical (Fixed / Floating Roof), Horizontal, Underground (UST)" },
      { label: "Capacity Range", value: "1,000 Litres to 50,000 m³ (1 KL – 50,000 KL)" },
      { label: "Shell Material", value: "Carbon Steel (A36 / A516 Gr.70), Stainless Steel (304L / 316L), Duplex, FRP" },
      { label: "Design Pressure", value: "Atmospheric to 1.0 barg (Low-Pressure API 620 up to 15 psig)" },
      { label: "Corrosion Protection", value: "Internal Lining (Epoxy / Rubber), External Coating + Cathodic Protection" },
      { label: "Accessories", value: "Manways, Vents, Level Gauges, Heating Coils, Mixers, Foam Chambers" },
    ],
    standards: ["API 650", "API 620", "API 653", "AWWA D100"],
    leadTime: "Factory Fabricated – 10 to 20 Weeks",
  },
  {
    id: "stg-pressure-vessels",
    name: "Pressure Vessels",
    modelNumber: "PV-ASME-VIII-DIV1-CRN",
    category: "Storage",
    brand: "Constantflow Engineered Package",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [pressureVesselImg, storageTankImg],
    description: "ASME Section VIII Div. 1 & Div. 2 pressure vessels for process storage, separation, and reaction services across oil & gas, petrochemical, and power industries.",
    overview: "Engineered with full ASME U-stamp certification, NDE (RT/UT/PT/MT), nozzle scheduling, lifting lugs, and third-party inspection by TÜV, Bureau Veritas, or Lloyds. Material traceability maintained per EN 10204 3.1/3.2 MTRs.",
    specs: [
      { label: "Vessel Types", value: "Horizontal, Vertical, Spherical (Bullets), Reactors, Separators, Accumulators" },
      { label: "Design Pressure", value: "Full Vacuum to 350 barg (5,000 psig)" },
      { label: "Design Temperature", value: "-196°C to +600°C (Cryogenic to High-Temp Service)" },
      { label: "Shell Material", value: "CS (SA516-70), SS (SA240 304L/316L), Duplex, Inconel, Titanium, Clad" },
      { label: "NDE Requirements", value: "RT / UT / PT / MT per ASME Section VIII UW-11" },
      { label: "Certification", value: "ASME U-Stamp, CRN (Canada), PED (EU), EAC (Russia/CIS)" },
    ],
    standards: ["ASME Section VIII Div. 1 / Div. 2", "PD 5500", "EN 13445", "API 510"],
    leadTime: "Engineered-to-Order – 8 to 18 Weeks",
  },
  {
    id: "stg-chemical-storage",
    name: "Chemical Storage",
    modelNumber: "CHM-STGTNK-FRP-PE-SS",
    category: "Storage",
    brand: "Constantflow Engineered Package",
    capacity: "Standard Duty",
    availability: "Factory Built / Engineered",
    images: [chemicalStorageImg, storageTankImg],
    description: "Dedicated chemical storage systems including FRP tanks, polyethylene (HDPE) tanks, and stainless steel vessels for acids, caustics, solvents, and hazardous chemicals.",
    overview: "Fully bunded systems with secondary containment, chemical-resistant linings, overfill protection, level monitoring, and spill management accessories. Compliant with COSHH / ATEX / IEC 61511 functional safety requirements.",
    specs: [
      { label: "Tank Materials", value: "FRP (Fiberglass), HDPE / XLPE Polyethylene, Stainless Steel (316L / 904L), Hastelloy" },
      { label: "Capacity Range", value: "100 Litres to 200,000 Litres (0.1 KL to 200 KL)" },
      { label: "Chemical Compatibility", value: "Acids (HCl, H₂SO₄, HNO₃), Caustics (NaOH, KOH), Bleach, Solvents, Chlorine" },
      { label: "Secondary Containment", value: "Integral Bunding ≥ 110% Capacity, Impermeable Membrane Liner" },
      { label: "Safety Features", value: "High-Level Alarms, Overflow Protection, Earthing / Bonding, Vent Scrubbers" },
      { label: "Regulatory Compliance", value: "COSHH, EPA 40 CFR 112, ATEX Zone Classification, IEC 61511" },
    ],
    standards: ["BS EN 13341", "ASTM D1998", "ISO 16486", "NFPA 30"],
    leadTime: "Stock FRP/HDPE Units – 2 to 4 Weeks; Custom SS – 8 to 14 Weeks",
  },
  {
    id: "stg-water-storage",
    name: "Water Storage",
    modelNumber: "WTR-STGTANK-GLS-STEEL-PE",
    category: "Storage",
    brand: "Constantflow Engineered Package",
    capacity: "High Capacity",
    availability: "Factory Built / Engineered",
    images: [waterStorageImg, storageTankImg],
    description: "Bolted steel, GLS (Glass-Lined Steel), polyethylene, and concrete water storage tanks for potable water, fire water, irrigation, and industrial process water applications.",
    overview: "NSF/ANSI 61 certified for potable water contact, with UV-stabilized or galvanized steel outer shells, food-grade inner linings, and optional insulation. Roof options include dome, flat, or geodesic designs.",
    specs: [
      { label: "Tank Types", value: "Bolted GLS (Glasscoat), Welded Steel, Polyethylene, Sectional GRP, Concrete" },
      { label: "Capacity Range", value: "5,000 Litres to 5,000,000 Litres (5 KL to 5,000 KL)" },
      { label: "Inner Lining", value: "Glass Fused to Steel (GLS), NSF-61 Epoxy, Food-Grade PE, EPDM Rubber" },
      { label: "Water Types", value: "Potable (Drinking) Water, Fire Fighting, Process, Cooling Tower Make-up, Irrigation" },
      { label: "Structural Options", value: "Above Ground, Elevated (On Supports), Below Ground, Sectional Panel" },
      { label: "Accessories", value: "Access Hatches, Overflow Pipes, Inlet/Outlet Nozzles, Ladders, Float Valves" },
    ],
    standards: ["NSF/ANSI 61", "AWWA D100", "BS EN 13280", "NFPA 22"],
    leadTime: "Standard Sizes – 3 to 6 Weeks; Large Custom – 10 to 16 Weeks",
  },
  {
    id: "stg-gas-storage",
    name: "Gas Storage",
    modelNumber: "GAS-BLTVESSEL-LPG-NG-SCUBA",
    category: "Storage",
    brand: "Constantflow Engineered Package",
    capacity: "Severe Service / High Pressure",
    availability: "Factory Built / Engineered",
    images: [gasStorageImg, pressureVesselImg],
    description: "High-pressure gas storage solutions including LPG bullets, compressed natural gas (CNG) cascades, nitrogen accumulators, and hydrogen storage vessels to ASME VIII / PED standards.",
    overview: "Engineered for safe, long-term containment of flammable and inert gases under high pressure. All vessels supplied with pressure relief valves, pressure gauges, isolation valves, and hydrostatic test certification with ASME U-stamp.",
    specs: [
      { label: "Gas Types", value: "LPG (Propane / Butane), CNG, Nitrogen (N₂), Oxygen (O₂), Hydrogen (H₂), CO₂" },
      { label: "Vessel Types", value: "Horizontal Bullets, Vertical Cylinders, Mounded Vessels, Sphere Tanks" },
      { label: "Design Pressure", value: "17 barg to 350 barg (250 psig to 5,000 psig)" },
      { label: "Material Grade", value: "SA516-70 / SA537 Cl.1 Carbon Steel; SA240 304/316L Stainless for H₂ / O₂" },
      { label: "Safety Equipment", value: "PRV (API 520/526), Excess Flow Valves, Flame Arrestors, Earthing Bosses" },
      { label: "Inspection & Cert.", value: "ASME U-Stamp, PED 2014/68/EU, EN 13445, Hydrostatic Test at 1.5× MAWP" },
    ],
    standards: ["ASME Section VIII Div. 1", "EN 13445", "NFPA 58", "ADR / IMDG (Transport)"],
    leadTime: "Engineered-to-Order – 10 to 20 Weeks",
  },
];



const CAPACITY_OPTIONS = [
  "All Capacities",
  "Standard Duty",
  "Heavy Duty",
  "Severe Service / High Pressure",
  "High Capacity",
];

const AVAILABILITY_OPTIONS = [
  "All Availability",
  "Ex-Stock Warehouse",
  "Rapid Dispatch (1-2 Weeks)",
  "Factory Built / Engineered",
];

/* ─── Main Categories Page Component ─── */
export default function CategoriesPage() {
  useSEO({
    title: 'Industrial Equipment Categories | Valves, Pumps, Piping, Instrumentation & More — Constantflow Procurement',
    description:
      'Browse 11 categories of industrial equipment: valves & actuation, pumps & compressors, piping & fittings, instrumentation, heat exchangers, electrical equipment, heavy machinery, oil & gas packages, storage, and more. Request a quote from Constantflow Procurement.',
    canonical: 'https://constantflow-procurement.com/categories',
    ogTitle: 'Industrial Equipment Categories | Constantflow Procurement Nigeria',
    ogDescription:
      'Shop 11 categories of industrial equipment: ball valves, centrifugal pumps, heat exchangers, flow meters, excavators, wellhead assemblies, and more. Constantflow Procurement — Nigeria & West Africa.',
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("All Capacities");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("All Availability");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Detail Modal State
  const [activeItem, setActiveItem] = useState<EquipmentItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const reduceMotion = useReducedMotion();

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Filter Logic across all 50 items (without brand)
  const filteredEquipment = useMemo(() => {
    return EQUIPMENT_CATALOG.filter((item) => {
      const matchCat =
        selectedCategory === "All Categories" || item.category === selectedCategory;
      const matchCapacity =
        selectedCapacity === "All Capacities" || item.capacity === selectedCapacity;
      const matchAvail =
        selectedAvailability === "All Availability" ||
        item.availability === selectedAvailability;
      const matchSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.modelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.standards.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchCapacity && matchAvail && matchSearch;
    });
  }, [selectedCategory, selectedCapacity, selectedAvailability, searchQuery]);

  // Related equipment in modal
  const relatedItems = useMemo(() => {
    if (!activeItem) return [];
    return EQUIPMENT_CATALOG.filter(
      (item) => item.id !== activeItem.id && item.category === activeItem.category
    ).slice(0, 3);
  }, [activeItem]);

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    selectedCapacity !== "All Capacities" ||
    selectedAvailability !== "All Availability" ||
    searchQuery !== "";

  const resetFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedCapacity("All Capacities");
    setSelectedAvailability("All Availability");
    setSearchQuery("");
  };

  return (
    <div className="app-shell bg-[#FAFBFD] text-[#1A1C2E] min-h-screen w-full">
      <DarkHeader />

      <main className="relative w-full">
        {/* ── 1. Hero Banner (Full-Width Minimal Corporate) ── */}
        <section className="relative w-full overflow-hidden bg-[#0A0C1A] text-white pt-28 pb-12 sm:pt-34 sm:pb-16 md:pt-36 md:pb-18">
          {/* Ambient Lighting */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#D78034]/25 blur-3xl" />
            <div className="absolute -bottom-36 right-0 h-[480px] w-[480px] rounded-full bg-[#080A7E]/35 blur-3xl" />
          </div>

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D78034]/40 to-transparent" />

          <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="space-y-3.5 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#ffd89b]">
                <Sparkles className="w-3.5 h-3.5 text-[#D78034]" />
                Industrial Equipment Catalog
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
                {selectedCategory === "All Categories"
                  ? "Industrial Equipment & Materials"
                  : selectedCategory}
              </h1>

              <p className="text-[14.5px] sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                Procure mission-critical valves, rotating equipment, structural
                tubulars, instrumentation, and engineered packages verified to
                API, ASME, and ISO standards with full mill test certificates.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Sticky Filter Bar (Full-Width, Brand Filter Removed) ── */}
        <section className="lg:sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E5F0] shadow-sm py-3 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 transition-all">
          <div className="w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5E7A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search equipment, model, standards..."
                className="w-full rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] pl-9 pr-3.5 py-2 text-[13.5px] font-medium text-[#1A1C2E] placeholder:text-[#5A5E7A]/60 outline-none transition-all focus:border-[#D78034] focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdowns Grid (3 Clean Dropdowns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 max-w-3xl">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] px-3 py-2 text-[12.5px] sm:text-[13px] font-semibold text-[#1A1C2E] outline-none transition-all focus:border-[#D78034] focus:bg-white pr-8 truncate cursor-pointer hover:border-[#CBD0E1]"
                >
                  <option value="All Categories">All Categories</option>
                  {CATEGORIES_LIST.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5A5E7A] pointer-events-none" />
              </div>

              {/* Capacity Dropdown */}
              <div className="relative">
                <select
                  value={selectedCapacity}
                  onChange={(e) => setSelectedCapacity(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] px-3 py-2 text-[12.5px] sm:text-[13px] font-semibold text-[#1A1C2E] outline-none transition-all focus:border-[#D78034] focus:bg-white pr-8 truncate cursor-pointer hover:border-[#CBD0E1]"
                >
                  {CAPACITY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5A5E7A] pointer-events-none" />
              </div>

              {/* Availability Dropdown */}
              <div className="relative">
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] px-3 py-2 text-[12.5px] sm:text-[13px] font-semibold text-[#1A1C2E] outline-none transition-all focus:border-[#D78034] focus:bg-white pr-8 truncate cursor-pointer hover:border-[#CBD0E1]"
                >
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#5A5E7A] pointer-events-none" />
              </div>
            </div>

            {/* Clear Filters / Count */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[12px] font-bold text-[#D78034] hover:underline"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear All
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── 3. Full-Width Equipment Grid (2x2 on Mobile, 2 on Tablet, 3/4/5 on Desktop) ── */}
        <section className="w-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12">
          {/* Header row */}
          <div className="flex items-center justify-end pb-4 mb-5 sm:mb-6 border-b border-[#E2E5F0]">
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#2E7D4F]">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#2E7D4F] animate-pulse" />
              Procurement Desk Active
            </div>
          </div>

          {filteredEquipment.length === 0 ? (
            <div className="rounded-2xl border border-[#E2E5F0] bg-white p-12 text-center space-y-3">
              <SlidersHorizontal className="h-10 w-10 text-[#5A5E7A] mx-auto opacity-40" />
              <h3 className="text-lg font-bold text-[#1A1C2E]">
                No equipment matches your current search
              </h3>
              <p className="text-sm text-[#5A5E7A] max-w-md mx-auto">
                Try clearing selected filters. Our global sourcing desk can also
                source any unlisted equipment per your technical datasheet.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#0A0C1A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#D78034] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5 lg:gap-6">
              {filteredEquipment.map((item) => (
                <motion.div
                  key={item.id}
                  layout="position"
                  initial={reduceMotion ? undefined : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#E2E5F0] bg-white p-3 sm:p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(10,12,26,0.08)] hover:border-[#D78034]/40"
                >
                  <div className="space-y-2 sm:space-y-3">
                    {/* Photo Container with subtle hover zoom */}
                    <div className="relative w-full h-28 sm:h-40 md:h-44 rounded-lg sm:rounded-xl bg-[#F8F9FC] border border-[#E2E5F0]/60 p-2 sm:p-3.5 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-108"
                      />
                      {/* Category Tag */}
                      <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 rounded bg-white/95 px-1.5 py-0.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#080A7E] shadow-sm border border-[#E2E5F0] max-w-[100px] sm:max-w-[125px] truncate">
                        {item.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#5A5E7A] truncate">
                        {item.modelNumber}
                      </div>
                      <h2 className="text-[12.5px] sm:text-[14.5px] md:text-[15px] font-bold text-[#1A1C2E] leading-snug line-clamp-2">
                        {item.name}
                      </h2>
                    </div>

                    {/* Key Specs tags */}
                    <div className="space-y-1 pt-0.5 text-[10px] sm:text-[11.5px] text-[#5A5E7A]">
                      <div className="flex items-center justify-between border-b border-[#F0F2F7] pb-1">
                        <span className="truncate">Standard:</span>
                        <span className="font-semibold text-[#1A1C2E] truncate max-w-[70px] sm:max-w-[120px] text-right">
                          {item.standards[0]}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="pt-2 sm:pt-3 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItem(item);
                        setActiveImageIndex(0);
                      }}
                      className="group/btn w-full inline-flex items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-[#0A0C1A] py-1.5 sm:py-2 px-2 sm:px-3.5 text-[11px] sm:text-[12.5px] font-bold text-white transition-all duration-200 hover:bg-[#D78034] hover:shadow-[0_4px_14px_rgba(215,128,52,0.25)]"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ── 4. Compact & Proportionate Detail Modal ── */}
        <AnimatePresence>
          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveItem(null)}
                className="fixed inset-0 bg-[#0A0C1A]/75 backdrop-blur-sm"
              />

              {/* Modal Card (Compact & Proportionate) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-[#E2E5F0] overflow-hidden my-auto max-h-[78vh] flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E2E5F0] bg-[#FAFBFD] shrink-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5E7A] truncate">
                    <span className="rounded-md bg-[#080A7E]/8 text-[#080A7E] px-2.5 py-0.5 font-bold truncate">
                      {activeItem.category}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[#1A1C2E] truncate">
                      {activeItem.modelNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveItem(null)}
                    aria-label="Close detail modal"
                    className="rounded-full p-1 text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors shrink-0 ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto p-4 space-y-3 flex-1">
                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Left: Gallery & Quality Card */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="relative h-36 w-full rounded-xl bg-[#F8F9FC] border border-[#E2E5F0] p-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={activeItem.images[activeImageIndex] || activeItem.images[0]}
                          alt={activeItem.name}
                          className="h-full w-full object-contain"
                        />
                        <span className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#1A1C2E] border border-[#E2E5F0] shadow-sm">
                          Verified Spec
                        </span>
                      </div>

                      {/* Thumbnails */}
                      {activeItem.images.length > 1 && (
                        <div className="flex items-center gap-1.5">
                          {activeItem.images.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveImageIndex(idx)}
                              className={`h-9 w-9 rounded-md border p-0.5 bg-[#F8F9FC] transition-all ${
                                activeImageIndex === idx
                                  ? "border-[#D78034] ring-2 ring-[#D78034]/20 shadow-sm"
                                  : "border-[#E2E5F0] hover:border-zinc-400"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Angle ${idx + 1}`}
                                className="h-full w-full object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Compact Quality Card */}
                      <div className="rounded-lg border border-[#E2E5F0] bg-[#FAFBFD] px-3 py-2 text-[10.5px] flex items-start gap-2 text-[#5A5E7A]">
                        <ShieldCheck className="w-3 h-3 text-[#2E7D4F] mt-0.5 shrink-0" />
                        <p className="leading-snug">
                          <span className="font-bold text-[#1A1C2E]">Quality Guarantee — </span>
                          100% FAT records, traceable MTC EN 10204 3.1/3.2 certs, DNV/BV inspection.
                        </p>
                      </div>
                    </div>

                    {/* Right: Specs & Action */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D78034]">
                          {activeItem.brand}
                        </div>
                        <h2 className="text-lg font-bold text-[#1A1C2E] tracking-tight mt-0.5">
                          {activeItem.name}
                        </h2>
                        <p className="text-[11.5px] text-[#5A5E7A] leading-relaxed mt-1 line-clamp-3">
                          {activeItem.overview}
                        </p>
                      </div>

                      {/* Compact Specs Grid */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A1C2E]/60">
                          Engineering Specifications
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {activeItem.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="rounded-md border border-[#E2E5F0] bg-[#FAFBFD] px-2 py-1.5 text-[10px]"
                            >
                              <div className="text-[#5A5E7A] font-medium truncate">
                                {spec.label}
                              </div>
                              <div className="text-[#1A1C2E] font-bold text-[10.5px] mt-0.5 truncate">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Standards */}
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {activeItem.standards.map((std) => (
                          <span
                            key={std}
                            className="rounded bg-[#080A7E]/6 text-[#080A7E] border border-[#080A7E]/12 px-1.5 py-0.5 text-[9.5px] font-bold"
                          >
                            {std}
                          </span>
                        ))}
                      </div>

                      {/* Compact Highlighted Note + CTA row */}
                      <div className="rounded-lg border border-[#D78034]/35 bg-[#FFF9F3] px-3 py-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-[#D78034] shrink-0" />
                          <p className="text-[10.5px] text-[#5A5E7A] leading-snug">
                            <span className="font-bold text-[#1A1C2E]">Need pricing? </span>
                            Proposals within 24 hours.
                          </p>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <RouterLink
                            to="/contact"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#D78034] px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-[#c97328]"
                          >
                            <Mail className="w-3 h-3" />
                            Quote
                          </RouterLink>
                          <RouterLink
                            to="/contact"
                            className="inline-flex items-center gap-1 rounded-lg border border-[#1A1C2E]/20 bg-white px-3 py-1.5 text-[11px] font-bold text-[#1A1C2E] hover:bg-[#F8F9FC] transition-all"
                          >
                            <Phone className="w-3 h-3 text-[#5A5E7A]" />
                            Contact
                          </RouterLink>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Equipment Section (Compact) */}
                  {relatedItems.length > 0 && (
                    <div className="pt-3 border-t border-[#E2E5F0] space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold text-[#1A1C2E] uppercase tracking-wider">
                          Related Equipment
                        </h3>
                        <span className="text-[10px] text-[#5A5E7A]">
                          In {activeItem.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {relatedItems.map((rel) => (
                          <div
                            key={rel.id}
                            onClick={() => {
                              setActiveItem(rel);
                              setActiveImageIndex(0);
                            }}
                            className="group/rel rounded-lg border border-[#E2E5F0] bg-[#FAFBFD] p-2.5 cursor-pointer hover:border-[#D78034] hover:bg-white transition-all flex items-center gap-2.5"
                          >
                            <div className="h-10 w-10 rounded bg-white border border-[#E2E5F0] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={rel.images[0]}
                                alt={rel.name}
                                className="h-full w-full object-contain group-hover/rel:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[9.5px] font-bold text-[#5A5E7A] uppercase truncate">
                                {rel.modelNumber}
                              </div>
                              <div className="text-[11.5px] font-bold text-[#1A1C2E] truncate">
                                {rel.name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── 5. Full-Width Sourcing CTA Section ── */}
        <section className="relative w-full overflow-hidden bg-[#0A0C1A] text-white py-14 sm:py-18 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#D78034]/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-[#080A7E]/30 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffd89b]">
              <Building2 className="w-3.5 h-3.5 text-[#D78034]" />
              Global Procurement Network
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight">
              Can&apos;t find the equipment you need?
              <br className="hidden sm:block" />{" "}
              <span className="text-[#D78034]">
                Describe it and our global sourcing team will help.
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our engineering team sources unlisted, obsolete, fast-track, and
              high-specification custom equipment directly through our audited
              OEM network across North America, Europe, and Asia.
            </p>

            <div className="pt-2">
              <RouterLink
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#D78034] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(215,128,52,0.35)] transition-all hover:bg-[#c97328] hover:scale-105 active:scale-95"
              >
                Submit Custom Sourcing Request
                <ArrowRight className="w-4 h-4" />
              </RouterLink>
            </div>
          </div>
        </section>
      </main>

      {/* ── 6. Global Footer ── */}
      <Footer />
    </div>
  );
}

