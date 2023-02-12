/// <reference types="emscripten" />

export class Calculator {
  constructor();
  loadGlobalDefinitions(): void;
  loadGlobalCurrencies(): void
  calculateAndPrint(input: string, timeout: number): string;
}

export interface QalcModule extends EmscriptenModule {
  Calculator: typeof Calculator;
}

// Declare any name
declare const qalcModule: QalcModule;
// Only for -s MODULARIZE=1
export = qalcModule;