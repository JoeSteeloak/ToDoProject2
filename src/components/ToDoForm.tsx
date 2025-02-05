import { useState } from "react"

const ToDoForm = () => {

    interface FormData {
        title: string,
        description: string,
        status: boolean
    }

    const [formData, setFormData] = useState<FormData>({title: "", description: "", status: false})

    const submitForm = ((event: any) => {
        event.preventDefault();

        console.log("test")
    })


    return (
        <>
        <form onSubmit={submitForm}>
            <label htmlFor="title">Task</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})}/>

            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}/>

            <label htmlFor="status">Have you already started the task?</label>
            <input type="checkbox" name="status" id="status" checked={formData.status} onChange={() => setFormData({...formData, status: !formData.status})}/>
            <input type="submit" value="Add to List" />
        </form>
        </>
    )
}

export default ToDoForm
