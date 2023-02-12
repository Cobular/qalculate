import Thing from "../../assets/qalculate-wasn-artifacts/qalc"


var Module = {
  postRun: () => {
      console.time('new');
      window.calc = new Module.Calculator();
      calc.loadGlobalDefinitions();
      console.timeEnd('new');

      newCell();
  },
  
  print: function (text) {
      if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(' ');
      console.log(text);
  },
  printErr: function (text) {
      if (arguments.length > 1)
          text = Array.prototype.slice.call(arguments).join(' ');
      console.error(text);
  },
  setStatus: function (text) {
      if (!Module.setStatus.last)
          Module.setStatus.last = { time: Date.now(), text: '' };
      if (text === Module.setStatus.last.text) return;
      var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
      var now = Date.now();
      if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
      Module.setStatus.last.time = now;
      Module.setStatus.last.text = text;
      if (m) {
          text = m[1];
      }
      statusElement.innerHTML = text;
  },
  totalDependencies: 0,
  monitorRunDependencies: function (left) {
      this.totalDependencies = Math.max(this.totalDependencies, left);
      Module.setStatus(
          left
              ? 'Preparing... (' +
                    (this.totalDependencies - left) +
                    '/' +
                    this.totalDependencies +
                    ')'
              : 'All downloads complete.'
      );
  },
};
export default {
  calc: Thing
}