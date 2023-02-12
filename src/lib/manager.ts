import qalc, { Calculator } from "./qalc/qalc.js";

export async function load_qalc(): Promise<Calculator> {
  return new Promise((resolve, reject) => {
    qalc()
      .then((instance) => {        
        const calculator = new instance.Calculator() as Calculator;
        if (calculator === null) {
          reject(new Error("Calculator did not initalize when constructed"));
        }
        calculator.loadGlobalDefinitions();
        calculator.loadGlobalCurrencies();
        calculator.useIntervalArithmetic(false);
        console.log("Loaded qalc");
        
        resolve(calculator);
      })
      .catch((err) => {
        reject(err);
      });
  });
}