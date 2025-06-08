import React, { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

type FormProps = {
    title: string;
    image?: File | null;
    price: number;
    age: string,
    description: string
}

const Ajout = () => {

    const {data, setData, post, reset} = useForm<Required<FormProps>>({
        title: "",
        image: null as File | null,
        price: 0,
        age: "",
        description: ""
    })

    const [fileName, setFileName] = useState("Choisir une image");

    const [preview, setPreview] = useState<string | null>(null);
    function handleSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('ajout'), {
            forceFormData: true,
            onFinish: () => reset()
        })
    }

    return (
        <div className={'container mx-auto flex min-h-screen items-center justify-center'}>
            <Head title={'Ajouter un article'} />
            <form onSubmit={handleSubmit} action="" method="post" className={'my-5 w-9/10 rounded border border-gray-300 p-5 md:w-auto'}>
                <label htmlFor="title">Ajouter un titre</label>
                <input
                    type="text"
                    name={'title'}
                    id={'title'}
                    placeholder={"Titre de l'article"}
                    className={'ml-2 border border-gray-300 focus:outline-none'}
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <br />
                <br />
                <label htmlFor="image" className={'bg-accent-bis inline-block cursor-pointer rounded p-5 text-white shadow'}>
                    <span>{fileName}</span>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept={'image/*'}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setData('image', file);
                                setPreview(URL.createObjectURL(file));
                                setFileName(file.name);
                            }
                        }}
                        className={'hidden'}
                        required
                    />
                </label>
                <br />
                <br />
                <label htmlFor="price">Prix</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder={"Prix de l'article"}
                    className={'ml-2 border border-gray-300 focus:outline-none'}
                    value={data.price}
                    onChange={(e) => {
                        setData('price', parseFloat(e.target.value));
                    }}
                    required
                />
                <br />
                <br />
                <select
                    name="age"
                    id="age"
                    className={'border border-gray-300'}
                    value={data.age}
                    onChange={(e) => setData('age', e.target.value)}
                    required
                >
                    <option value="" disabled>
                        --Choisissez une valeur---
                    </option>
                    <option value={'Tous publics'}>Tous publics</option>
                </select>
                <br />
                <br />
                <label htmlFor="description">Résumé</label><br/>
                <textarea name="description" id="description" className={"border border-gray-300 focus:outline-none resize-none w-full lg:w-100 h-100"} value={data.description} onChange={(e) => setData("description", e.target.value)}></textarea><br/>
                <input type="submit" value="Valider" />
            </form>
        </div>
    );
};

export default Ajout
