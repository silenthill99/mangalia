import React, { useState } from 'react';
import { Form, Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import MangaController from '@/actions/App/Http/Controllers/MangaController';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const Create = () => {
    const [fileName, setFileName] = useState("Choisir une image");

    const [preview, setPreview] = useState<string | null>(null);

    const { errors } = usePage<{errors: Record<string, string>}>().props;

    return (
        <div className={'container mx-auto flex min-h-screen items-center justify-center'}>
            <Head title={'Ajouter un article'} />
            <Form
                {...MangaController.store.form()}
                resetOnSuccess
                className={'my-5 w-9/10 rounded border border-gray-300 p-5 md:w-auto'}
            >
                <div className={'flex justify-between'}>
                    <label htmlFor="title">Ajouter un titre</label>
                    <input
                        type="text"
                        name={'title'}
                        id={'title'}
                        placeholder={"Titre de l'article"}
                        className={'ml-2 border pr-2 text-right focus:outline-none'}
                        required
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="image" className={'bg-accent-bis inline-block w-full cursor-pointer rounded p-5 text-center text-white shadow'}>
                        <span>{fileName}</span>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept={'image/*'}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                    setFileName(file.name);
                                }
                            }}
                            className={'hidden'}
                        />
                    </label>
                    {preview && <img src={preview} alt={'Preview'} className={'mt-5 max-w-full rounded lg:max-w-2xl'} />}
                    {errors.image && <p className={'text-red-600'}>{errors.image}</p>}
                </div>
                <br />

                <div className={'flex justify-between'}>
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        placeholder={"Prix de l'article"}
                        className={'ml-2 border text-right focus:outline-none'}
                        required
                    />
                </div>
                <br />

                <Select name="age" required>
                    <SelectTrigger className={'w-full border text-center focus:outline-none'}>
                        <SelectValue placeholder={'--Choisissez une valeur--'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={'Tous publics'}>Tous publics</SelectItem>
                            <SelectItem value={'12 +'}>12 +</SelectItem>
                            <SelectItem value={'16 +'}>16 +</SelectItem>
                            <SelectItem value={'18 +'}>18 +</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <br />
                <br />
                <label htmlFor="description">Résumé</label>
                <br />
                <textarea
                    name="description"
                    id="description"
                    className={'h-100 w-full resize-none border p-2 text-justify focus:outline-none lg:w-2xl'}
                    required
                ></textarea>
                <br />
                <div className={'flex justify-between'}>
                    <input
                        type="submit"
                        value="Valider"
                        className={'cursor-pointer rounded bg-black p-2 text-white duration-300 hover:bg-gray-600 active:bg-gray-800'}
                    />
                    <button
                        type={'button'}
                        onClick={() => {
                            if (confirm('Voulez-vous continuer ? Toutes les modifications apportées seront perdues')) {
                                router.visit(dashboard());
                            }
                        }}
                    >
                        Annuler
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Create
