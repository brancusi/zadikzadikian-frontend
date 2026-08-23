import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const tokensPath = join(root, "src", "styles", "tokens.css");
const globalPath = join(root, "src", "styles", "global.css");
const tokens = readFileSync(tokensPath, "utf8");
const globalCss = readFileSync(globalPath, "utf8");

function filesBelow(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

describe("authoritative Zadikian design-system foundation", () => {
  it("keeps one design-token owner and limits runtime custom properties to media geometry", () => {
    const declarations = filesBelow(join(root, "src"))
      .filter((path) => /\.(?:astro|css)$/.test(path))
      .flatMap((path) => {
        const source = readFileSync(path, "utf8");
        return [...source.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map((match) => ({
          path: relative(root, path),
          token: match[1],
        }));
      });

    const exceptions = declarations.filter(
      ({ path }) => path !== "src/styles/tokens.css",
    );
    expect(exceptions).toEqual([
      { path: "src/components/ArtworkImage.astro", token: "--media-focal-x" },
      { path: "src/components/ArtworkImage.astro", token: "--media-focal-y" },
      { path: "src/components/ArtworkImage.astro", token: "--media-aspect" },
      { path: "src/components/ArtworkImage.astro", token: "--media-fit" },
    ]);
    expect(globalCss.startsWith('@import "./tokens.css";')).toBe(true);
  });

  it("locks the supplied primitives, semantic accessibility corrections, and geometry", () => {
    expect(tokens).toContain("--paper: #fbfaf6;");
    expect(tokens).toContain("--ink: #161512;");
    expect(tokens).toContain("--gold: #a8842c;");
    expect(tokens).toContain("--text-meta-color: var(--ink-meta-accessible);");
    expect(tokens).toContain("--page-margin: clamp(2rem, 7vw, 7.5rem);");
    expect(tokens).toContain("--measure-body: 62ch;");
    expect(tokens).toContain("--radius-none: 0;");
    expect(tokens).toContain("--shadow-none: none;");
    expect(tokens).toContain("--duration-color: 180ms;");
    expect(tokens).toContain("--duration-page: 240ms;");
  });

  it("ships local/system typography and the flat, motion-restrained visual contract", () => {
    expect(tokens).not.toMatch(/@font-face|url\s*\(/i);
    expect(globalCss).not.toMatch(/gradient\s*\(|box-shadow\s*:/i);
    expect(globalCss).not.toMatch(/transform:\s*scale/i);
    expect(globalCss).toContain("@media (prefers-reduced-motion: reduce)");
    expect(globalCss).toContain("@media (forced-colors: active)");
  });

  it("keeps documented breakpoints aligned with actual media queries", () => {
    expect(tokens).toContain("--breakpoint-narrow: 42rem;");
    expect(tokens).toContain("--breakpoint-wide: 56rem;");
    expect(globalCss).toContain("@media (max-width: 42rem)");
    expect(globalCss).toContain("@media (max-width: 56rem)");
  });

  it("renders the reference component and name-as-wordmark in static output", () => {
    const home = readFileSync(join(root, "dist", "index.html"), "utf8");

    expect(home).toContain('<html lang="en" data-design-system="zadikian">');
    expect(home).toContain('class="wordmark"');
    expect(home).toContain(">Zadik Zadikian</a>");
    expect(home).toContain('<header class="section-heading">');
    expect(home).toContain(
      '<h2 id="selected-work-heading">Work, with room to breathe.</h2>',
    );
    expect(home).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
  });

  it("records the reviewed source and intentional asset omissions", () => {
    const contract = readFileSync(
      join(root, "docs", "design-system.md"),
      "utf8",
    );
    expect(contract).toContain(
      "5adb2e06afb5476316b6ce828a67e6eafcce8e43bf8fae01091afb0ba5e41642",
    );
    expect(contract).toContain(
      "No artwork photograph from the archive was imported.",
    );
    expect(contract).toContain(
      "archive contains neither font files nor a font license",
    );
  });
});
