import { checkLoggedInUser, displayAvatar } from "./utils/avatar";
import { registerWithCredentials, loginWithCredentials } from "./api/auth";

export async function Register(name: string, email: string, password: string) {
  const errorMessageOutput = document.querySelector(
    ".error-message"
  ) as HTMLDivElement;

  if (errorMessageOutput) {
    errorMessageOutput.textContent = "";
  }

  try {
    // 1. Register the user
    const registerResponse = await registerWithCredentials(
      name,
      email,
      password
    );

    if (registerResponse.status !== 201) {
      throw new Error("Registration failed");
    }

    console.log("Registration successful:", registerResponse.data);

    // 2. Automatically log in the user after successful registration
    try {
      const loginResponse = await loginWithCredentials(email, password);

      if (loginResponse.status !== 200) {
        throw new Error("Auto-login failed after registration");
      }

      const userName = loginResponse.data.user.name;

      // 3. Update UI to reflect logged-in state
      localStorage.setItem("user", userName);
      const popover = document.querySelector("#login-dialog") as HTMLElement;
      popover?.hidePopover();

      displayAvatar(userName);
      checkLoggedInUser();
    } catch (loginError) {
      console.error("Auto-login failed:", loginError);
      errorMessageOutput.textContent =
        "Registration successful but automatic login failed. Please log in manually.";
    }
  } catch (error) {
    console.error("Error registering:", error);
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      (error as any).response?.data
    ) {
      errorMessageOutput.textContent =
        (error as any).response.data || "Registration error. Try again.";
    } else {
      errorMessageOutput.textContent = "Registration failed. Please try again.";
    }
  }
}
