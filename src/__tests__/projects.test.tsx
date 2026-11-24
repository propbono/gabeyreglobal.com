import { describe, it, expect } from "vitest";
import type { ComponentType } from "react";
import { render, screen, within } from "@testing-library/react";
import {
  RouterContextProvider,
  createMemoryHistory,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Route } from "@/routes/work/index";

const WorkPage = Route.options.component as ComponentType;

describe("PROJECTS (shared source)", () => {
  it("lists Archdrill first with its screenshot image", () => {
    expect(PROJECTS[0].title).toBe("Archdrill");
    expect(PROJECTS[0].image).toBe("/images/archdrill-screenshot.png");
  });

  it("gives every project a title, href, category, and description", () => {
    for (const p of PROJECTS) {
      expect(p.title).toBeTruthy();
      expect(p.href).toMatch(/^https:\/\//);
      expect(p.category).toBeTruthy();
      expect(p.description).toBeTruthy();
    }
  });
});

describe("PortfolioGrid (homepage work section)", () => {
  it("renders Archdrill as the first project card with its image", () => {
    render(<PortfolioGrid />);
    const cards = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://"));
    expect(cards[0]).toHaveTextContent("Archdrill");
    const img = within(cards[0] as HTMLElement).getByAltText("Archdrill");
    expect(img).toHaveAttribute("src", "/images/archdrill-screenshot.png");
  });
});

describe("WorkPage (/work route)", () => {
  it("renders Archdrill as the first project card with its image", () => {
    const rootRoute = createRootRoute();
    const router = createRouter({
      routeTree: rootRoute,
      history: createMemoryHistory({ initialEntries: ["/work"] }),
    });
    render(
      <RouterContextProvider router={router}>
        <WorkPage />
      </RouterContextProvider>,
    );
    const cards = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("https://"));
    expect(cards[0]).toHaveTextContent("Archdrill");
    const img = within(cards[0] as HTMLElement).getByAltText("Archdrill");
    expect(img).toHaveAttribute("src", "/images/archdrill-screenshot.png");
  });
});
