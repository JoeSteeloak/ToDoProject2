import { useState } from "react"
import "./ToDoForm.css";

const ToDoForm = () => {

    interface FormData {
        title: string,
        description: string,
        status: boolean
    }

    interface ErrorsData {
        title?: string,
        description?: string
    }

    //State for form
    const [formData, setFormData] = useState<FormData>({ title: "", description: "", status: false });

    //state for error
    const [errors, setErrors] = useState<ErrorsData>({});

    const validateForm = ((data: FormData) => {
        const validationErrors: ErrorsData = {};

        if (!data.title) {
            validationErrors.title = "Enter a name for the task";
        } else if (data.title.length < 3) {
            validationErrors.title = "Title must be at least 3 characters";
        }

        if (!data.description) {
            validationErrors.description = "Give the task a description";
        } else if (data.description.length > 200) {
            validationErrors.description = "Description must not exceed 200 characters";
        }

        return validationErrors;
    });


    const submitForm = ((event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {
            setErrors({});
            // skicka data
 
            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status ? "in progress" : "not started"
            };

            fetch("https://todoapi-167u.onrender.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    // Eventuellt rensa formuläret här:
                    setFormData({ title: "", description: "", status: false });
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    })


    return (
        <>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Task</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

                {errors.title && <span>{errors.title}</span>}

                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />

                {errors.description && <span>{errors.description}</span>}

                <label htmlFor="status">Have you already started the task?</label>
                <input type="checkbox" name="status" id="status" checked={formData.status} onChange={() => setFormData({ ...formData, status: !formData.status })} />
                <input type="submit" value="Add to List" />
            </form>
        </>
    )
}

export default ToDoForm
