import { useState } from "react";
import "./ToDoForm.css";

interface FormData {
    title: string;
    description: string;
    status: boolean;
}

interface ErrorsData {
    title?: string;
    description?: string;
}

interface Props {
    getPosts: () => void;
}

const ToDoForm = ({ getPosts }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        status: false,
    });

    const [errors, setErrors] = useState<ErrorsData>({});

    const validateForm = (data: FormData) => {
        const validationErrors: ErrorsData = {};

        if (!data.title) {
            validationErrors.title = "Enter a name for the task";
        } else if (data.title.length < 3) {
            validationErrors.title = "Title must be at least 3 characters";
        }

        if (data.description && data.description.length > 200) {
            validationErrors.description = "Description must not exceed 200 characters";
        }

        return validationErrors;
    };

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const payload = {
            title: formData.title,
            description: formData.description,
            status: formData.status ? "in progress" : "not started",
        };

        try {
            const response = await fetch("https://todoapi-167u.onrender.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await response.json();

            // Rensa formuläret
            setFormData({ title: "", description: "", status: false });

            // Uppdatera listan automatiskt
            getPosts();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Task</label>
            <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            />
            {errors.title && <span>{errors.title}</span>}

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
            {errors.description && <span>{errors.description}</span>}

            <label htmlFor="status">Have you already started the task?</label>
            <input
                type="checkbox"
                name="status"
                id="status"
                checked={formData.status}
                onChange={() => setFormData({ ...formData, status: !formData.status })}
            />
            <input type="submit" value="Add to List" />
        </form>
    );
};

export default ToDoForm;
