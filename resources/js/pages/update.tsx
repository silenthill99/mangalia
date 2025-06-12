import React, { FormEvent, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';

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
    const [preview, setPreview] = useState<string | null>("/storage/" + article.path);

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
                  className={'my-5 w-9/10 rounded border p-5 md:w-auto'}>
                <div className={'flex justify-between'}>
                    <label htmlFor="title">Ajouter un titre</label>
                    <input
                        type="text"
                        name={'title'}
                        id={'title'}
                        placeholder={"Titre de l'article"}
                        className={'ml-2 border focus:outline-none text-right pr-2'}
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                </div>
                <br />
                <label htmlFor="image"
                       className={'bg-accent-bis inline-block cursor-pointer rounded p-5 text-white shadow w-full text-center'}>
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
                <div className={"flex justify-between"}>
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder={"Prix de l'article"}
                        className={'ml-2 border focus:outline-none text-right'}
                        value={data.price}
                        onChange={(e) => {
                            setData('price', parseFloat(e.target.value));
                        }}
                        required
                    />
                </div>
                <br />
                <select
                    name="age"
                    id="age"
                    className={'border w-full text-center'}
                    value={data.age}
                    onChange={(e) => setData('age', e.target.value)}
                    required
                >
                    <option value="" disabled>--Choisissez une valeur---</option>
                    <option value={'Tous publics'}>Tous publics</option>
                    <option value={'12 +'}>12 +</option>
                    <option value={'16 +'}>16 +</option>
                    <option value={'18 +'}>18 +</option>
                </select>
                <br />
                <br />
                <label htmlFor="description">Résumé</label><br />
                <textarea
                    name="description"
                    id="description"
                    className={"border focus:outline-none resize-none w-full lg:w-2xl h-100 text-justify p-2"}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                ></textarea><br />
                <div className={'flex justify-between'}>
                    <input type="submit" value="Valider" className={'bg-black text-white p-2 rounded hover:bg-gray-600 active:bg-gray-800 cursor-pointer duration-300'} />
                    <button type={"button"} onClick={() => {
                        if (confirm("Voulez-vous continuer ? Toutes les modifications apportées seront perdues")) {
                            router.visit(route("dashboard"));
                        }
                    }}>Annuler</button>
                </div>
            </form>
        </div>
    )
}

export default Update
