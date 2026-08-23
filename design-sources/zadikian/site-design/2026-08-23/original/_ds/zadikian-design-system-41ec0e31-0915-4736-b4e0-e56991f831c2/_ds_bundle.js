/* @ds-bundle: {"format":4,"namespace":"ZadikianDesignSystem_41ec0e","components":[{"name":"SpecList","sourcePath":"components/catalog/SpecList.jsx"},{"name":"Tombstone","sourcePath":"components/catalog/Tombstone.jsx"},{"name":"WorkFigure","sourcePath":"components/catalog/WorkFigure.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CVList","sourcePath":"components/editorial/CVList.jsx"},{"name":"PressItem","sourcePath":"components/editorial/PressItem.jsx"},{"name":"Folio","sourcePath":"components/typographic/Folio.jsx"},{"name":"PullQuote","sourcePath":"components/typographic/PullQuote.jsx"},{"name":"SectionHeading","sourcePath":"components/typographic/SectionHeading.jsx"}],"sourceHashes":{"components/catalog/SpecList.jsx":"c11157986f69","components/catalog/Tombstone.jsx":"567bf4cc9b99","components/catalog/WorkFigure.jsx":"db5d484d709e","components/core/Button.jsx":"d017acb86af8","components/editorial/CVList.jsx":"0d1f1c3801ae","components/editorial/PressItem.jsx":"af6f7586d7af","components/typographic/Folio.jsx":"be608703f436","components/typographic/PullQuote.jsx":"d483488591db","components/typographic/SectionHeading.jsx":"e728c9ff41e3","ui_kits/proposal/PagesBody.jsx":"157e3901bcba","ui_kits/proposal/PagesIntro.jsx":"70f166c91d88"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ZadikianDesignSystem_41ec0e = window.ZadikianDesignSystem_41ec0e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/catalog/SpecList.jsx
try { (() => {
function SpecList({
  items = []
}) {
  return /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      borderTop: '2px solid var(--rule-strong)'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '160px 1fr',
      gap: 'var(--space-5)',
      padding: 'var(--space-3) 0',
      borderBottom: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)',
      paddingTop: '3px'
    }
  }, it.label), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-body)',
      color: 'var(--text-display)'
    }
  }, it.value))));
}
Object.assign(__ds_scope, { SpecList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/SpecList.jsx", error: String((e && e.message) || e) }); }

// components/catalog/Tombstone.jsx
try { (() => {
function Tombstone({
  title,
  year,
  medium,
  dimensions,
  edition,
  catalogNo,
  align = 'left'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      maxWidth: '48ch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-body)',
      color: 'var(--text-display)'
    }
  }, /*#__PURE__*/React.createElement("em", null, title), year ? `, ${year}` : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-meta)',
      lineHeight: 'var(--leading-meta)',
      color: 'var(--text-meta)'
    }
  }, medium && /*#__PURE__*/React.createElement("div", null, medium), dimensions && /*#__PURE__*/React.createElement("div", null, dimensions), edition && /*#__PURE__*/React.createElement("div", null, edition), catalogNo && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      letterSpacing: 'var(--tracking-caption)',
      color: 'var(--text-display)'
    }
  }, catalogNo)));
}
Object.assign(__ds_scope, { Tombstone });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/Tombstone.jsx", error: String((e && e.message) || e) }); }

// components/catalog/WorkFigure.jsx
try { (() => {
function WorkFigure({
  src,
  alt,
  title,
  year,
  medium,
  dimensions,
  edition,
  catalogNo,
  bleed = false
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || title,
    style: {
      display: 'block',
      width: '100%',
      height: bleed ? '100%' : 'auto',
      objectFit: bleed ? 'cover' : 'initial'
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tombstone, {
    title: title,
    year: year,
    medium: medium,
    dimensions: dimensions,
    edition: edition,
    catalogNo: catalogNo
  })));
}
Object.assign(__ds_scope, { WorkFigure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/catalog/WorkFigure.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = 'outline',
  onClick,
  disabled = false,
  href
}) {
  const [hover, setHover] = React.useState(false);
  const base = {
    display: 'inline-block',
    boxSizing: 'border-box',
    cursor: disabled ? 'default' : 'pointer',
    fontFamily: 'var(--font-grotesque)',
    fontSize: 'var(--text-caption)',
    letterSpacing: 'var(--tracking-meta)',
    textTransform: 'uppercase',
    padding: '14px 28px',
    border: '1px solid var(--ink)',
    borderRadius: 0,
    background: 'transparent',
    color: 'var(--ink)',
    textDecoration: 'none',
    transition: 'background .18s ease, color .18s ease, border-color .18s ease',
    opacity: disabled ? 0.35 : 1
  };
  const styles = {
    solid: {
      ...base,
      background: hover && !disabled ? 'var(--gold-deep)' : 'var(--ink)',
      borderColor: hover && !disabled ? 'var(--gold-deep)' : 'var(--ink)',
      color: 'var(--paper)'
    },
    outline: {
      ...base,
      background: hover && !disabled ? 'var(--ink)' : 'transparent',
      color: hover && !disabled ? 'var(--paper)' : 'var(--ink)'
    },
    text: {
      ...base,
      border: 'none',
      padding: '14px 0',
      color: hover && !disabled ? 'var(--gold)' : 'var(--ink)',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      textDecorationThickness: '1px'
    }
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: styles[variant] || styles.outline
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/editorial/CVList.jsx
try { (() => {
function CVList({
  heading,
  entries = []
}) {
  return /*#__PURE__*/React.createElement("section", null, heading && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-grotesque)',
      fontWeight: 400,
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)',
      margin: '0 0 var(--space-4)',
      borderBottom: '2px solid var(--rule-strong)',
      paddingBottom: 'var(--space-2)'
    }
  }, heading), /*#__PURE__*/React.createElement("div", null, entries.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 'var(--space-5)',
      padding: 'var(--space-2) 0',
      borderBottom: '1px solid var(--rule)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-meta)',
      color: 'var(--text-meta)',
      paddingTop: '2px'
    }
  }, e.year), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-body)',
      lineHeight: 1.45,
      color: 'var(--text-display)'
    }
  }, e.text)))));
}
Object.assign(__ds_scope, { CVList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/CVList.jsx", error: String((e && e.message) || e) }); }

// components/editorial/PressItem.jsx
try { (() => {
function PressItem({
  quote,
  publication,
  author,
  year
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      borderTop: '1px solid var(--rule)',
      paddingTop: 'var(--space-4)',
      maxWidth: '52ch'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-lede)',
      lineHeight: 1.45,
      color: 'var(--text-display)'
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-3) 0 0',
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, author && /*#__PURE__*/React.createElement("span", null, author, ", "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-display)'
    }
  }, publication), year && /*#__PURE__*/React.createElement("span", null, ", ", year)));
}
Object.assign(__ds_scope, { PressItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/PressItem.jsx", error: String((e && e.message) || e) }); }

// components/typographic/Folio.jsx
try { (() => {
function Folio({
  left,
  center,
  right
}) {
  const meta = {
    fontFamily: 'var(--font-grotesque)',
    fontSize: 'var(--text-caption)',
    letterSpacing: 'var(--tracking-meta)',
    textTransform: 'uppercase',
    color: 'var(--text-meta)'
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderTop: '1px solid var(--rule)',
      paddingTop: 'var(--space-3)',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: meta
  }, left), /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta,
      textAlign: 'center'
    }
  }, center), /*#__PURE__*/React.createElement("span", {
    style: {
      ...meta,
      color: 'var(--text-display)'
    }
  }, right));
}
Object.assign(__ds_scope, { Folio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typographic/Folio.jsx", error: String((e && e.message) || e) }); }

// components/typographic/PullQuote.jsx
try { (() => {
function PullQuote({
  quote,
  attribution,
  source
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      maxWidth: '26ch'
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif-display)',
      fontStyle: 'italic',
      fontSize: 'var(--text-headline)',
      lineHeight: 1.22,
      letterSpacing: '-0.01em',
      color: 'var(--text-display)',
      textWrap: 'balance'
    }
  }, "\u201C", quote, "\u201D"), (attribution || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 'var(--space-5)',
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, attribution, attribution && source ? ', ' : '', source));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typographic/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/typographic/SectionHeading.jsx
try { (() => {
function SectionHeading({
  index,
  label,
  title,
  size = 'display'
}) {
  const fs = size === 'colossal' ? 'var(--text-colossal)' : size === 'headline' ? 'var(--text-headline)' : 'var(--text-display)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      borderTop: '2px solid var(--rule-strong)',
      paddingTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'var(--font-grotesque)',
      fontSize: 'var(--text-caption)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)',
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("span", null, label), index && /*#__PURE__*/React.createElement("span", null, index)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontWeight: 400,
      fontSize: fs,
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--text-display)',
      margin: 0,
      textWrap: 'balance'
    }
  }, title));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typographic/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposal/PagesBody.jsx
try { (() => {
const {
  SectionHeading,
  PullQuote,
  WorkFigure,
  SpecList,
  CVList,
  PressItem
} = window.ZadikianDesignSystem_41ec0e;
const IMG = window.propIMG,
  meta = window.propMeta;
function WorksPage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "02",
    label: "Works for acquisition",
    title: "Pigmented plaster, 2024\u20132026"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--space-6) 0 0',
      maxWidth: 'var(--measure-body)',
      color: 'var(--text-body)'
    }
  }, "Cast, stacked, and pigmented through the mass \u2014 not painted \u2014 each work extends the brick logic of the Venice pavilion to freestanding, human-scale volumes. Titles and dimensions below are placeholders pending studio records."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 'var(--space-9)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(WorkFigure, {
    src: IMG('A-009'),
    title: "Untitled",
    year: "2025",
    medium: "Pigmented plaster",
    dimensions: "Dimensions on request",
    edition: "Unique",
    catalogNo: "A-009"
  }), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Provenance',
      value: 'The artist; Tony Shafrazi | Gallery Without Walls'
    }, {
      label: 'Exhibited',
      value: 'Studio, Brooklyn, 2025'
    }, {
      label: 'Condition',
      value: 'Excellent'
    }, {
      label: 'Price',
      value: 'On request'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(WorkFigure, {
    src: IMG('A-020'),
    title: "Untitled",
    year: "2025",
    medium: "Pigmented plaster",
    catalogNo: "A-020"
  }), /*#__PURE__*/React.createElement(WorkFigure, {
    src: IMG('A-023'),
    title: "Untitled",
    year: "2025",
    medium: "Pigmented plaster",
    catalogNo: "A-023"
  }), /*#__PURE__*/React.createElement(WorkFigure, {
    src: IMG('A-026'),
    title: "Untitled",
    year: "2025",
    medium: "Pigmented plaster",
    catalogNo: "A-026"
  })));
}
function ProjectPage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "03",
    label: "Future work \xB7 site-specific",
    title: "A proposal in the elemental unit"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.3fr',
      gap: 'var(--space-9)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)'
    }
  }, "Zadikian proposes a commissioned installation built on site from cast plaster blocks, pigmented through the mass and assembled over the course of the exhibition \u2014 the arrangement remaining separate, movable, alive. As in Venice, the room becomes a working studio; precision, repetition, and attentive labour are the medium as much as the plaster."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Scale',
      value: 'Sized to site · survey required'
    }, {
      label: 'Duration',
      value: 'Built over the run of the exhibition'
    }, {
      label: 'Crew',
      value: 'The artist with two studio assistants'
    }, {
      label: 'Precedent',
      value: 'The Studio, Armenian Pavilion, Venice, 2026'
    }]
  }))), /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: IMG('A-015'),
    alt: "Installation view",
    style: {
      display: 'block',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      ...meta,
      marginTop: 'var(--space-3)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Installation view, 2026"), /*#__PURE__*/React.createElement("span", null, "A-015")))));
}
function CVPage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "04",
    label: "Curriculum vitae",
    title: "Selected history"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-9)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(CVList, {
    heading: "Selected exhibitions",
    entries: [{
      year: 2026,
      text: 'The Studio, Armenian Pavilion, 61st Venice Biennale (cur. Tony Shafrazi, Tina Chakarian)'
    }, {
      year: 2025,
      text: 'RETURN, Cafesjian Center for the Arts, Yerevan'
    }, {
      year: 2025,
      text: 'Made in USA, Independent 20th Century, New York'
    }, {
      year: 2024,
      text: 'Path to Nine, Brooklyn Museum, New York'
    }, {
      year: 1984,
      text: 'The New Portrait, MoMA PS1, New York (gilded entrance)'
    }, {
      year: 1978,
      text: '1,000 Gold Bricks, Tony Shafrazi Gallery, Tehran'
    }, {
      year: 1975,
      text: '1,000 Bricks Gilded in 22 Carat Gold Leaf, P.S.1, Long Island City'
    }]
  }), /*#__PURE__*/React.createElement(CVList, {
    heading: "Chronology",
    entries: [{
      year: 1948,
      text: 'Born Yerevan, Soviet Armenia'
    }, {
      year: 1963,
      text: 'Enters the Art Academy of Yerevan'
    }, {
      year: 1967,
      text: 'Escapes the USSR across the Araks River'
    }, {
      year: 1969,
      text: 'San Francisco; assistant to Beniamino Bufano'
    }, {
      year: 1974,
      text: 'New York; assists Richard Serra on the oil-stick wall drawings'
    }, {
      year: 2026,
      text: 'Represents Armenia, Venice Biennale'
    }]
  })));
}
function PressPage() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "05",
    label: "Press",
    title: "Selected citations"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8) var(--space-9)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(PressItem, {
    quote: "One of the leading sculptors in the realm of contemporary alchemy.",
    publication: "The Armenian Mirror-Spectator",
    year: "2026"
  }), /*#__PURE__*/React.createElement(PressItem, {
    quote: "Minimal and monumental, singular and interdependent, each unit holds the tension between one and many.",
    publication: "La Biennale di Venezia",
    year: "2026"
  }), /*#__PURE__*/React.createElement(PressItem, {
    quote: "He's more involved in this presentation than anything in his life as a dealer.",
    publication: "ARTnews",
    author: "Elizabeth Dee on Tony Shafrazi",
    year: "2025"
  }), /*#__PURE__*/React.createElement(PressItem, {
    quote: "A legend, mythmaker, and voyager across geographical and artistic boundaries.",
    publication: "Encyclopedia of Design",
    year: "2021"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-10)',
      borderTop: '1px solid var(--gold)',
      paddingTop: 'var(--space-5)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 'var(--text-title)',
      color: 'var(--text-display)'
    }
  }, "Tony Shafrazi | Gallery Without Walls"), /*#__PURE__*/React.createElement("div", {
    style: meta
  }, "info@tonyshafrazigallery.com \xB7 +1 212 274 9300")));
}
Object.assign(window, {
  WorksPage,
  ProjectPage,
  CVPage,
  PressPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/PagesBody.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposal/PagesIntro.jsx
try { (() => {
const DS = window.ZadikianDesignSystem_41ec0e;
const {
  SectionHeading,
  PullQuote,
  Folio,
  WorkFigure,
  Tombstone,
  SpecList,
  CVList,
  PressItem,
  Button
} = DS;
const IMG = n => `../../assets/web/${n}.jpg`;
const meta = {
  fontFamily: 'var(--font-grotesque)',
  fontSize: 'var(--text-caption)',
  letterSpacing: 'var(--tracking-meta)',
  textTransform: 'uppercase',
  color: 'var(--text-meta)'
};
function CoverPage() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: '1fr auto',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-9) 0 var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: meta
  }, "Acquisition proposal \xB7 Prepared for the collection committee"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-colossal)',
      marginTop: 'var(--space-7)'
    }
  }, "Zadik", /*#__PURE__*/React.createElement("br", null), "Zadikian"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--gold)',
      width: 120,
      margin: 'var(--space-7) 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-lede)',
      maxWidth: 'var(--measure-lede)',
      color: 'var(--text-body)'
    }
  }, "Monumental pigmented-plaster works, 2024\u20132026, with a proposal for a site-specific installation.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: IMG('A-001'),
    alt: "Installation view",
    style: {
      display: 'block',
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...meta,
      marginTop: 'var(--space-3)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Represented by Tony Shafrazi | Gallery Without Walls, New York"), /*#__PURE__*/React.createElement("span", null, "A-001"))));
}
function StatementPage() {
  const P = ({
    children
  }) => /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-5)',
      maxWidth: 'var(--measure-body)'
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    index: "01",
    label: "The artist",
    title: "Sixty years of material conviction"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 'var(--space-9)',
      marginTop: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-text)',
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(P, null, "Zadik Zadikian (b. 1948, Yerevan) trained at the Art Academy of Yerevan before escaping the Soviet Union at nineteen, swimming the Araks River under fire. Arriving in San Francisco in 1969, he assisted the sculptor Beniamino Bufano; in New York from 1974 he became a friend and assistant of Richard Serra, producing the large black oil-stick wall drawings \u2014 the first of which Serra titled ", /*#__PURE__*/React.createElement("em", null, "Zadikian"), "."), /*#__PURE__*/React.createElement(P, null, "His 1975 installation ", /*#__PURE__*/React.createElement("em", null, "1,000 Bricks Gilded in 22 Carat Gold Leaf"), " at P.S.1 announced the two constants of his practice: the brick as elemental unit, and surface as transformation. In 1978 he stacked a thousand gold-leafed mud bricks at Tony Shafrazi's Tehran gallery, weeks before the revolution took every one of them."), /*#__PURE__*/React.createElement(P, null, "Five decades on, the work has returned to the center of the conversation: ", /*#__PURE__*/React.createElement("em", null, "Path to Nine"), " at the Brooklyn Museum (2024), the retrospective ", /*#__PURE__*/React.createElement("em", null, "RETURN"), " at the Cafesjian Center for the Arts, Yerevan (2025), and the Armenian Pavilion at the 61st Venice Biennale (2026) \u2014 co-curated by Shafrazi \u2014 where the studio itself became the work.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(PullQuote, {
    quote: "My work is about filling a void.",
    attribution: "Zadik Zadikian"
  }), /*#__PURE__*/React.createElement(SpecList, {
    items: [{
      label: 'Born',
      value: '1948, Yerevan, Armenia'
    }, {
      label: 'Lives',
      value: 'New York'
    }, {
      label: 'Since',
      value: 'P.S.1, 1975 · Tehran, 1978 · MoMA PS1, 1984'
    }, {
      label: 'Current',
      value: 'Armenian Pavilion, Venice Biennale, 2026'
    }]
  }))));
}
Object.assign(window, {
  CoverPage,
  StatementPage,
  propIMG: IMG,
  propMeta: meta
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposal/PagesIntro.jsx", error: String((e && e.message) || e) }); }

__ds_ns.SpecList = __ds_scope.SpecList;

__ds_ns.Tombstone = __ds_scope.Tombstone;

__ds_ns.WorkFigure = __ds_scope.WorkFigure;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CVList = __ds_scope.CVList;

__ds_ns.PressItem = __ds_scope.PressItem;

__ds_ns.Folio = __ds_scope.Folio;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
