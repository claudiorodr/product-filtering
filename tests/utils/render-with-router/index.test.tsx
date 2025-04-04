import { useRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { App } from "@/routes";

afterEach(() => {
  vi.restoreAllMocks();
});

const TestComponent = () => {
  const _router = useRouter({ warn: true });

  return <App />;
};

describe("ProductFilter", () => {
  it("renders the ProductFilter component", () => {
    render(<TestComponent />);
    expect(
      screen.getByText(/Welcome to Salsify Product Filtering!/i),
    ).toBeInTheDocument();
  });

  it("allows the user to select a property", async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    // Open the property dropdown
    const propertyDropdown = screen.getByRole("combobox", {
      name: /property/i,
    });
    await user.click(propertyDropdown);

    // Select a property
    const propertyOption = screen.getByRole("button", {
      name: /Product Name/i,
    });
    await user.click(propertyOption);

    // expect(propertyDropdown).toHaveValue("Product Name");
  });

  it("allows the user to select an operator", async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    // Open the property dropdown
    const propertyDropdown = screen.getByRole("combobox", {
      name: /property/i,
    });
    await user.click(propertyDropdown);

    // Select a property
    const propertyOption = screen.getByRole("button", {
      name: /Product Name/i,
    });
    await user.click(propertyOption);

    // Open the operator dropdown
    const operatorDropdown = screen.getByRole("combobox", {
      name: /operator/i,
    });
    await user.click(operatorDropdown);

    // Select an operator
    const operatorOption = screen.getByRole("button", {
      name: /equals/i,
    });
    await user.click(operatorOption);

    // expect(operatorDropdown).toHaveValue("equals");
  });

  it("allows the user to enter a property value", async () => {
    render(<TestComponent />);
    const user = userEvent.setup();

    // Enter a property value
    const propertyValueInput = screen.getByLabelText(/property value/i);
    await user.type(propertyValueInput, "test value");

    // expect(propertyValueInput).toHaveValue("test value");
  });

  it("resets the filters when the reset button is clicked", async () => {
    render(<TestComponent />);
    const user = userEvent.setup();
    // Open the property dropdown
    const propertyDropdown = screen.getByRole("combobox", {
      name: /property/i,
    });
    await user.click(propertyDropdown);
    // Select a property
    const propertyOption = screen.getByRole("button", {
      name: /Product Name/i,
    });
    await user.click(propertyOption);
    // Open the operator dropdown
    const operatorDropdown = screen.getByRole("combobox", {
      name: /operator/i,
    });
    await user.click(operatorDropdown);
    // Select an operator
    const operatorOption = screen.getByRole("button", {
      name: /equals/i,
    });
    await user.click(operatorOption);
    // Enter a property value
    const propertyValueInput = screen.getByLabelText(/property value/i);
    await user.type(propertyValueInput, "test value");
    // Click the reset button
    const resetButton = screen.getByRole("button", {
      name: /reset/i,
    });
    await user.click(resetButton);
    // Check that the filters are reset
    expect(propertyDropdown).toHaveValue("");
    expect(operatorDropdown).toHaveValue("");
    expect(propertyValueInput).toHaveValue("");
  });
});
