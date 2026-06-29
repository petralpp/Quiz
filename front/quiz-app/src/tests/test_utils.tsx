import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import type { AppStore } from "../store/store";

export function renderWithProviders(ui: ReactElement, store: AppStore) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper })
  };
}
