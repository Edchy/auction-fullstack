import { checkLoggedInUser, displayAvatar } from "./utils/avatar";
import { loginWithCredentials } from "./api/auth";

export async function Login(email: string, password: string) {
  const errorMessageOutput = document.querySelector(
    ".error-message"
  ) as HTMLDivElement;
  console.log("Login function called");

  if (errorMessageOutput) {
    errorMessageOutput.textContent = "";
  }

  try {
    const response = await loginWithCredentials(email, password);

    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    console.log("Response received:", response);
    console.log(response.status);

    const {
      data: {
        user: { name },
      },
    } = response; // omg triple destructuring, so cool and unreadable

    const popover = document.querySelector("#login-dialog") as HTMLElement;
    popover.hidePopover();
    console.log("Login successful:", response.data);
    displayAvatar(name);
    localStorage.setItem("user", name);
    checkLoggedInUser();
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      console.error(error.response);
      errorMessageOutput.textContent =
        (error as any).response.data ||
        "An error occurred during login. Please try again.";
    } else {
      console.error(error);
    }
  }
}
