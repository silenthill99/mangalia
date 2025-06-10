import React, { FormEvent, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';

type ArticleProps = {
    id: number;
    title: string;
    price: number;
    age: string;
    description: string;
    path: string; // chemin actuel de l'image
};

const Update = () => {
    const { article } = usePage<{ article: ArticleProps }>().props;

    const [fileName, setFileName] = useState("Choisir une image");
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData , post, reset} = useForm({
        title: article.title,
        price: article.price,
        age: article.age,
        description: article.description,
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('update', article.id), {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => reset()
        })
    };

    const { errors } = usePage<{errors: Record<string, string>}>().props;

    return (
        <div className="container mx-auto flex min-h-screen items-center justify-center">
            <Head title="Update" />
            <form onSubmit={handleSubmit} action="" method="post"
                  className={'my-5 w-9/10 rounded border border-gray-300 p-5 md:w-auto'}>
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
                <label htmlFor="image"
                       className={'bg-accent-bis inline-block cursor-pointer rounded p-5 text-white shadow'}>
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
                    />
                </label>
                {preview && (
                    <img src={preview} alt={"Preview"} className={"max-w-full lg:max-w-2xl mt-5 rounded"}/>
                )}
                {errors.image && (
                    <p className={"text-red-600"}>{errors.image}</p>
                )}
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
                    <option value={'12 +'}>12 +</option>
                </select>
                <br />
                <br />
                <label htmlFor="description">Résumé</label><br />
                <textarea
                    name="description"
                    id="description"
                    className={"border border-gray-300 focus:outline-none resize-none w-full lg:w-100 h-100"}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                ></textarea><br />
                <input type="submit" value="Valider" />
            </form>
        </div>
    )
}

export default Update
