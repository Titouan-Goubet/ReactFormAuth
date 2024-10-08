import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import BackgroundImage from "../assets/background.jpg";
import "./signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      lastName: "",
    },
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://javaformauth-production.up.railway.app/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setServerErrorMessage("");
        setSuccessMessage(result.message || "Inscription réussie");
      } else {
        setServerErrorMessage(
          result.message || "Erreur lors de l'inscription."
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setServerErrorMessage("Impossible de se connecter au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="sign-up__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-up__backdrop"></div>
      <Form
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h4 mb-2 text-center">Inscription</div>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="..."
            required
            {...register("email", {
              required: "l'Email est requis",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Le format de l'Email est invalide",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <div className="input-with-icon">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              required
              {...register("password", {
                required: "Mot de passe requis",
                minLength: {
                  value: 8,
                  message:
                    "Le mot de passe doit contenir au moins 8 caractères",
                },
              })}
              className="password-input"
            />
            <i
              className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>
        {serverErrorMessage.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <Button
          className="w-100 mt-4"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "S'inscrire"}
        </Button>
      </Form>
    </div>
  );
}
