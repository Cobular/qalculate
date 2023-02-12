export interface Context {
  mi?: { [key: string]: string };
  mo?: { [key: string]: string };
  mn?: { [key: string]: string };
  mrow?: { [key: string]: string };
  mfrac?: { [key: string]: string };
  mroot?: { [key: string]: string };
  msqrt?: { [key: string]: string };
  mtable?: { [key: string]: string };
  mtr?: { [key: string]: string };
  mtd?: { [key: string]: string };
}

export interface LX {
  eq: string;
  i: number;
}

function cmd_predef_op(ctx: Context, name: string) {
  return { elem: "mo", attr: ctx["mo"], val: name };
}

function cmd_predef_sym(ctx: Context, name: string) {
  return { elem: "mi", attr: ctx["mi"], val: name };
}

function cmd_mathlet(lx: LX, ctx: Context, name: string) {
  const new_ctx = clone_object(ctx);
  new_ctx["mi"]["mathletiant"] = name;
  new_ctx["mn"]["mathletiant"] = name;
  return parse_block(lx, new_ctx);
}

// command mapping table
const cmd_map = {
  // operators
  times: function (lx: LX, ctx: Context) {
    return cmd_predef_op(ctx, "&times;");
  },
  div: function (lx: LX, ctx: Context) {
    return cmd_predef_op(ctx, "&divide;");
  },
  // large symbols
  sum: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&sum;");
  },
  prod: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&prod;");
  },
  int: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&int;");
  },
  // structures
  frac: function (lx: LX, ctx: Context) {
    const repr1 = parse_block(lx, ctx);
    const repr2 = parse_block(lx, ctx);
    return { elem: "mfrac", attr: {}, val: yield_value(repr1) + yield_value(repr2) };
  },
  rt: function (lx: LX, ctx: Context) {
    const repr1 = parse_block(lx, ctx);
    const repr2 = parse_block(lx, ctx);
    return { elem: "mroot", attr: {}, val: yield_value(repr2) + yield_value(repr1) };
  },
  sqrt: function (lx: LX, ctx: Context) {
    const repr = parse_block(lx, ctx);
    return { elem: "msqrt", attr: {}, val: yield_value(repr) };
  },
  ar: function (lx: LX, ctx: Context) {
    return parse_array(lx, ctx);
  },
  // greek letters
  alpha: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&alpha;");
  },
  beta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&beta;");
  },
  gamma: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&gamma;");
  },
  Gamma: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Gamma;");
  },
  epsi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&epsi;");
  },
  letepsi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&epsiv;");
  },
  zeta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&zeta;");
  },
  eta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&eta;");
  },
  theta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&theta;");
  },
  lettheta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&thetav;");
  },
  Theta: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Theta;");
  },
  iota: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&iota;");
  },
  kappa: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&kappa;");
  },
  lambda: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&lambda;");
  },
  Lambda: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Lambda;");
  },
  mu: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&mu;");
  },
  nu: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&nu;");
  },
  xi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&xi;");
  },
  Xi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Xi;");
  },
  pi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&pi;");
  },
  letpi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&piv;");
  },
  Pi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Pi;");
  },
  rho: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&rho;");
  },
  letrho: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&rhov;");
  },
  Rho: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Rho;");
  },
  sigma: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&sigma;");
  },
  letsigma: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&sigmav;");
  },
  tau: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&tau;");
  },
  upsi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&upsi;");
  },
  Upsi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Upsi;");
  },
  phi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&phi;");
  },
  letphi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&phiv;");
  },
  Phi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Phi;");
  },
  chi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&chi;");
  },
  psi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&psi;");
  },
  Psi: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Psi;");
  },
  omega: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&omega;");
  },
  Omega: function (lx: LX, ctx: Context) {
    return cmd_predef_sym(ctx, "&Omega;");
  },
  // specials

  // functions
  af: function (lx: LX, ctx: Context) {
    let repr = parse_block(lx, ctx);
    return { elem: "mrow", attr: {}, val: yield_value(repr) + "<mo>&ApplyFunction;</mo>" };
  },
  // styles
  b: function (lx: LX, ctx: Context) {
    return cmd_mathlet(lx, ctx, "bold");
  },
  i: function (lx: LX, ctx: Context) {
    return cmd_mathlet(lx, ctx, "italic");
  },
  bi: function (lx: LX, ctx: Context) {
    return cmd_mathlet(lx, ctx, "bold-italic");
  },
  // fences
  lf: function (lx: LX, ctx: Context) {
    const c = get_char(lx);
    const attr = clone_object(ctx["mo"]);
    attr["stretchy"] = "true";
    attr["form"] = "prefix";
    return { elem: "mo", attr: attr, val: c };
  },
  rf: function (lx: LX, ctx: Context) {
    const c = get_char(lx);
    const attr = clone_object(ctx["mo"]);
    attr["stretchy"] = "true";
    attr["form"] = "postfix";
    return { elem: "mo", attr: attr, val: c };
  },
};

// operator mapping table
const op_map = {
  "+-": "&PlusMinus;",
  "+": "+",
  "-": "-",
  "*": "&InvisibleTimes;",
  "=": "=",
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
};

const op_pat = /^(?:\+-|\+|-|\*|=|\(|\)\[|\])/;
const num_pat = /^[0-9]+/;
const sym_pat = /^[A-Za-z]+/;
const cmd_pat = /^\\([A-Za-z][A-Za-z0-9]*)/;

function clone_object(obj: object) {
  if (typeof obj == "object") {
    const new_obj = new Object();

    for (const key in obj) {
      new_obj[key] = clone_object(obj[key]);
    }

    return new_obj;
  } else {
    return obj;
  }
}

function yield_value(repr) {
  let val = "<";
  val += repr.elem;

  for (const name in repr.attr) {
    val += " ";
    val += name;
    val += '="';
    val += repr.attr[name];
    val += '"';
  }

  val += ">";
  val += repr.val;
  val += "</";
  val += repr.elem;
  val += ">";
  return val;
}

function skip_ws(lx: LX) {
  let m = lx.eq.substr(lx.i).match(/^\s+/);
  if (m) lx.i += m[0].length;
}

function expect_char(lx, cc) {
  if (lx.eq.charCodeAt(lx.i) != cc) throw "eq2ml: expecting '" + String.fromCharCode(cc) + "'";

  lx.i += 1;
}

function is_eof(lx) {
  return lx.i == lx.eq.length;
}

function is_char(lx, cc) {
  return lx.eq.charCodeAt(lx.i) == cc;
}

function get_char(lx) {
  if (is_eof(lx)) throw "eq2ml: unexpceted EOF";

  const c = lx.eq[lx.i];
  lx.i += 1;
  return c;
}

function start_with(lx: LX, str: string) {
  return lx.eq.substr(lx.i).lastIndexOf(str, 0) == 0;
}

function consume_char(lx, cc: string) {
  let b = is_char(lx, cc);
  if (b) lx.i += 1;

  return b;
}

function consume_str(lx, str: string) {
  let b = start_with(lx, str);
  if (b) lx.i += str.length;

  return b;
}

function match_pat(lx, pat) {
  let m;

  if ((m = lx.eq.substr(lx.i).match(pat))) lx.i += m[0].length;

  return m;
}

function parse_script(lx, ctx, repr) {
  skip_ws(lx);

  switch (lx.eq.charCodeAt(lx.i)) {
    case 0x5f /* _ */:
      lx.i += 1;
      skip_ws(lx);

      let scr = parse_factor(lx, ctx);

      repr =
        scr.elem == "msup"
          ? { elem: "msubsup", attr: {}, val: yield_value(repr) + scr.val }
          : { elem: "msub", attr: {}, val: yield_value(repr) + yield_value(scr) };
      break;
    case 0x5e /* ^ */:
      lx.i += 1;
      skip_ws(lx);

      scr = parse_factor(lx, ctx);

      repr = { elem: "msup", attr: {}, val: yield_value(repr) + yield_value(scr) };
      break;
  }

  return repr;
}

function parse_factor(lx, ctx: Context) {
  let m, repr;

  if ((m = match_pat(lx, op_pat))) {
    let val = op_map[m[0]];
    if (!val) throw "eq2ml: no such operator: " + m[0];

    repr = { elem: "mo", attr: ctx["mo"], val: val };
  } else if ((m = match_pat(lx, num_pat))) {
    repr = { elem: "mn", attr: ctx["mn"], val: m[0] };
  } else if ((m = match_pat(lx, sym_pat))) {
    repr = { elem: "mi", attr: ctx["mi"], val: m[0] };
  } else if (is_char(lx, 0x7b /* { */)) {
    repr = parse_block(lx, ctx);
  } else if ((m = match_pat(lx, cmd_pat))) {
    let parse_cmd = cmd_map[m[1]];
    if (!parse_cmd) throw "eq2ml: no such command: " + m[1];

    repr = parse_cmd(lx, ctx);
  } else {
    throw "eq2ml: illegal character: " + lx.eq[lx.i];
  }

  return parse_script(lx, ctx, repr);
}

function parse_block(lx, ctx: Context) {
  skip_ws(lx);
  expect_char(lx, 0x7b /* { */);

  let repr;
  let val = "";
  let len = lx.eq.length;

  while (true) {
    skip_ws(lx);

    if (is_eof(lx)) {
      throw "eq2ml: missing '}'";
    } else if (consume_char(lx, 0x7d /* } */)) {
      break;
    } else {
      const repr_tmp = repr;
      repr = parse_factor(lx, ctx);
      if (repr_tmp) val += yield_value(repr_tmp);
    }
  }

  if (!repr) {
    return { elem: "mrow", attr: {}, val: "" };
  } else if (val.length == 0) {
    return repr;
  } else {
    return { elem: "mrow", attr: {}, val: val + yield_value(repr) };
  }
}

function parse_array(lx, ctx: Context) {
  skip_ws(lx);
  expect_char(lx, 0x7b /* { */);

  let table_val = "";
  let tr_val = "";
  let td_val = "";

  while (true) {
    skip_ws(lx);

    if (is_eof(lx)) {
      throw "eq2ml: missing '}'";
    } else if (consume_char(lx, 0x7d /* } */)) {
      break;
    } else if (consume_char(lx, 0x26 /* & */)) {
      tr_val += yield_value({ elem: "mtd", attr: {}, val: td_val });
      td_val = "";
    } else if (consume_str(lx, "\\\\")) {
      tr_val += yield_value({ elem: "mtd", attr: {}, val: td_val });
      td_val = "";
      table_val += yield_value({ elem: "mtr", attr: {}, val: tr_val });
      tr_val = "";
    } else {
      td_val += yield_value(parse_factor(lx, ctx));
    }
  }

  tr_val += yield_value({ elem: "mtd", attr: {}, val: td_val });
  table_val += yield_value({ elem: "mtr", attr: {}, val: tr_val });

  return { elem: "mtable", attr: {}, val: table_val };
}

export function interpret(eq: string, disp = false): string {
  const lx = { eq: eq, i: 0 };
  const ctx = { mo: {}, mn: {}, mi: {} };
  let val = "";

  while (true) {
    skip_ws(lx);

    if (is_eof(lx)) {
      break;
    } else {
      val += yield_value(parse_factor(lx, ctx));
    }
  }

  return yield_value({ elem: "math", attr: { display: disp ? "block" : "inline" }, val: val });
}

export function interpret_all() {
  const elems = document.getElementsByClassName("eq");

  for (let i = 0; i < elems.length; ++i) {
    try {
      elems[i].innerHTML = interpret(elems.textContent);
    } catch (e) {
      console.error(e);
    }
  }
}
