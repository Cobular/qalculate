/// <reference types="emscripten" />

export class MathStructure {};
export interface ParseOptions {
  base: number;
  preserve_format: boolean;
}

export interface PrintOptions {
  base: number;
  use_reference_names: boolean;
  use_unit_prefixes: boolean;
  use_unicode_signs: boolean;
  preserve_format: boolean;
  allow_factorization: boolean;
  spell_out_logical_operators: boolean;
  // indicate_infinite_series: boolean;
  // excess_parenthesis: boolean;
  abbreviate_names: boolean;
}

export class Calculator {
  constructor();
  loadGlobalDefinitions(): void;
  loadGlobalCurrencies(): void
  calculateAndPrint(input: string, timeout: number): string;
  parse(input: string, options: ParseOptions): MathStructure;
  print(structure: MathStructure, timeout: number, options: PrintOptions): string;
  useIntervalArithmetic(use: boolean): void;
}

export interface QalcModule extends EmscriptenModule {
  Calculator: typeof Calculator;
}

// Declare any name
declare const qalcModule: QalcModule;
// Only for -s MODULARIZE=1
export = qalcModule;