import React, { FormEvent, useState } from 'react';
import { useForm } from '@inertiajs/react';

type FormProps = {
    title: string;
    libelle: string;
    price: number;
    age: string;
    description: string;
    image: File | null;
}

const Form = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const {data, setData, post, reset} = useForm<Required<FormProps>>({
        title:"",
        libelle: '',
        price: 0,
        age: '',
        description: '',
        image: null as File | null,
    })

    function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('home'), {
            forceFormData: true,
            onFinish: () => reset()
        })
    }

    return (
        <form method={"post"} onSubmit={submitForm} >
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setData("image", file); // on enregistre le fichier dans useForm
                        setPreview(URL.createObjectURL(file)); // pour afficher l'aperçu
                    }
                }}
            /><br/>
            <input
                type="text"
                name={"title"}
                placeholder={"titre"}
                required
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
            /><br/>
            <input
                type="text"
                name={"libelle"}
                placeholder={"libelle"}
                required
                value={data.libelle}
                onChange={(e) => setData("libelle", e.target.value)}
            /><br/>
            <input
                type="number"
                name="price"
                value={data.price}
                onChange={(e) => setData('price', parseFloat(e.target.value))}
                required/><br/>
            <select
                name="age" id="age"
                required
                value={data.age}
                onChange={(e) => setData("age", e.target.value)}
            >
                <option value="" disabled selected>--Choisis une restriction--</option>
                <option value={"Tout public"}>Tout public</option>
            </select><br/>
            <textarea
                name="description"
                placeholder={"Description"}
                rows={10}
                cols={100}
                required
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                className={"border resize-none focus:outline-none"}
            ></textarea><br/>
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default Form;
