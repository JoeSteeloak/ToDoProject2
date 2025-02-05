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
    const [formData, setFormData] = useState<FormData>({title: "", description: "", status: false});

    //state for error
    const [errors, setErrors] = useState<ErrorsData>({});

    const validateForm = ((data: FormData) => {
        const validationErrors: ErrorsData = {};

        if(!data.title) {
            validationErrors.title = "Enter a name for the task";
        }

        if(!data.description) {
            validationErrors.description = "Give the task a description";
        }

        return validationErrors;
    });

    const submitForm = ((event: any) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {
            setErrors({});
            // skicka data

        }
    })


    return (
        <>
        <form onSubmit={submitForm}>
            <label htmlFor="title">Task</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})}/>

            {errors.title && <span>{errors.title}</span>}

            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}/>

            {errors.description && <span>{errors.description}</span>}

            <label htmlFor="status">Have you already started the task?</label>
            <input type="checkbox" name="status" id="status" checked={formData.status} onChange={() => setFormData({...formData, status: !formData.status})}/>
            <input type="submit" value="Add to List" />
        </form>
        </>
    )
}

export default ToDoForm
