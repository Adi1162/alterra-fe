import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/config";
import { Provider } from "react-redux";
import CreateProduct from "../src/pages/CreateProduct";

describe("Create Product", () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CreateProduct />
        </Provider>
      </BrowserRouter>
    );
  };
  test("Render Create Product Page", async () => {
    setup();
    expect(screen.getAllByText("Create Product")[0]).toBeInTheDocument();
  });
  test("should submit data products form successfully and show error message failed to save state", async () => {
    setup();
    const productNameInput = screen.getByLabelText(/product name/i);
    const productCategorySelect = screen.getByLabelText(/product category/i);
    const productPriceInput = screen.getByLabelText(/product price/i);
    const addtionalDescriptionInput = screen.getByLabelText(/addtional description/i);
    const productFreshnessRadio = screen.getByLabelText(/brand new/i);
    const imageProductInputFile = screen.getByLabelText(/image of products/i);
    const submitButton = screen.getByRole("button", { name: /create product/i });
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const randomNumber = Math.random() * 100;

    fireEvent.change(productNameInput, { target: { value: `Iphone ${randomNumber}` } });
    fireEvent.change(productPriceInput, { target: { value: 1000000 } });
    fireEvent.change(addtionalDescriptionInput, { target: { value: "Ram 8 SSD 512" } });
    fireEvent.click(productFreshnessRadio);
    userEvent.selectOptions(productCategorySelect, "Handphone");
    await userEvent.upload(imageProductInputFile, file);

    // Check if value is valid
    expect(imageProductInputFile.files[0]).toStrictEqual(file);
    expect(imageProductInputFile.files.item(0)).toStrictEqual(file);
    expect(imageProductInputFile.files).toHaveLength(1);

    expect(productNameInput.value).toBe(`Iphone ${randomNumber}`);
    expect(addtionalDescriptionInput.value).toBe("Ram 8 SSD 512");
    expect(productCategorySelect.value).toBe("Handphone");
    expect(productPriceInput.value).toBe("1000000");
    expect(productFreshnessRadio).toBeChecked();
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(`Iphone ${randomNumber}`)).toBeInTheDocument();
        expect(screen.getAllByText("Ram 8 SSD 512").pop()).toBeInTheDocument();
        expect(screen.getAllByText("Handphone").pop()).toBeInTheDocument();
        expect(screen.getAllByText("Brand New").pop()).toBeInTheDocument();
        expect(screen.getAllByText("1000000").pop()).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    fireEvent.change(productNameInput, { target: { value: `Iphone ${randomNumber}` } });
    fireEvent.change(productPriceInput, { target: { value: 1000000 } });
    fireEvent.change(addtionalDescriptionInput, { target: { value: "Ram 8 SSD 512" } });
    fireEvent.click(productFreshnessRadio);
    userEvent.selectOptions(productCategorySelect, "Handphone");
    await userEvent.upload(imageProductInputFile, file);

    // show failed to save state
    await waitFor(
      () => {
        expect(screen.queryAllByText(/product name already exist/i)).toHaveLength(0);
      },
      { timeout: 500 }
    );
  }, 10000);

  test("should show error message when input Product Name is Empty, have special character, and character > 25", async () => {
    setup();
    const productNameInput = screen.getByLabelText(/product name/i);
    const submitButton = screen.getByRole("button", { name: /create product/i });
    fireEvent.click(submitButton);
    await waitFor(() => screen.findByRole("error-message"));
    expect(screen.getByText("Product Name is required")).toBeInTheDocument();

    fireEvent.change(productNameInput, { target: { value: `Iphone %#!` } });
    await waitFor(() => screen.findByRole("error-message"));
    expect(screen.getByText("Product Name must not contain symbols.")).toBeInTheDocument();

    fireEvent.change(productNameInput, { target: { value: `IphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphone` } });
    await waitFor(() => screen.findByRole("error-message"));
    expect(screen.getByText("Product Name must not exceed 25 characters.")).toBeInTheDocument();

    fireEvent.change(productNameInput, { target: { value: `IphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphone` } });
    await waitFor(() => screen.findByRole("error-message"));
    expect(screen.getByText("Product Name must not exceed 25 characters.")).toBeInTheDocument();
  });

  test("should show error message on submit with empty input", async () => {
    setup();
    const submitButton = screen.getByRole("button", { name: /create product/i });
    fireEvent.click(submitButton);
    await waitFor(() => screen.findByRole("error-message"));
    expect(screen.getByText(/image product is required/i)).toBeInTheDocument();
    expect(screen.getByText("Product Name is required")).toBeInTheDocument();
    expect(screen.getByText("Product Category is required")).toBeInTheDocument();
    expect(screen.getByText("Product Price is required")).toBeInTheDocument();
    expect(screen.getByText("Addtional Description is required")).toBeInTheDocument();
  });
});
