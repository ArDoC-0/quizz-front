import { useEffect, useState } from "react";
import Card from "../../../shared/components/Card";
import { useAppSelector } from "../../../shared/hooks/hooks";
import { userService } from "../services/userService";
import type { trainers, UserForm } from "../../../api/user/userApi";
import Popup from "../../../shared/components/PopUp";
import UserCreatedPopupContent from "./components/UserCreationMessage";
import type { user } from "../../../api/auth/authApi";
import { toFormData } from "axios";
import { checkForm } from "../../../shared/utils/utils";

type response = {
    identifiant: string
}


export default function CreateUserForm() {
    const [pop, setpop] = useState(false)
    const [actionType, setActionType] = useState('add_trainor')
    const [response, setResponse] = useState<response>({
        identifiant: ''
    })
    const [trainers, setTrainers] = useState<trainers>([])

    const [formvalid, setFormValid] = useState(false)

    const [form, setForm] = useState<UserForm>({
        name: "",
        first_name: "",
        email: "",
        password: "hopes_2026",
        role_id: 3,
        professor_id: '',
        profil: undefined,
    });


    const auth = useAppSelector((state) => state.auth).user

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === "profil" && files && files[0]) {
            setForm(prev => ({ ...prev, profil: files[0] }));
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }

    };

    const handleRoleSelection = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const role = Number(value);

        setActionType(role === 2 ? 'add_trainor' : 'add_student');

        setForm(prev => ({
            ...prev,
            [name]: role
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formdata = toFormData(form)
            formdata.append("action_type", actionType
            )
            console.log(formdata);
            const response = await userService.create(
                formdata
            )
            setResponse({ identifiant: response.data.identifiant })
            setpop(true)
            console.log(response.data)
            setForm({
                name: "",
                first_name: "",
                email: "",
                password: "hopes_2026",
                role_id: 3,
                profil: undefined,
                professor_id: null,
            })
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        (async () => {
            const response = (await userService.trainers()).data
            setTrainers(response)
        })()

        return () => {

        }
    }, [])

    useEffect(()=> {
        setFormValid(checkForm(form))
    }, [])

    return (
        <div className="w-[70%] m-auto">
            <Popup open={pop} onClose={() => setpop(false)}>
                <UserCreatedPopupContent identifier={response.identifiant} />
            </Popup>
            <Card>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Créer un utilisateur
                </h2>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Nom */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="text-gray-600 text-sm font-medium mb-1">Nom</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nom complet"
                                className="p-1 border-none border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-gray-700"
                                required
                            />
                        </div>
                        {/* Nom */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="name" className="text-gray-600 text-sm font-medium mb-1">Prénoms</label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="Nom complet"
                                className="p-1 border-none border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-gray-700"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="email" className="text-gray-600 text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="nom@exemple.com"
                                className="p-1 border-none border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-gray-700"
                                required
                            />
                        </div>

                        {/* Mot de passe */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="password" className="text-gray-600 text-sm font-medium mb-1">Mot de passe <span className="text-red-400 text-xs">(par defaut)</span> </label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder={form.password}
                                className="p-1 border-none border-b-2 border-gray-300 focus:border-blue-500 outline-none placeholder-gray-400 text-gray-700"
                                required
                            />
                        </div>


                        {/* Rôle */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="role" className="text-gray-600 text-sm font-medium mb-1">
                                Rôle
                            </label>
                            <select
                                defaultValue={2}
                                name="role_id"
                                id="role_id"
                                // value={form.role_id}
                                onChange={handleRoleSelection}
                                className="
                                    p-2 
                                    text-gray-800 
                                    text-base 
                                    bg-white 
                                    border border-gray-300 
                                    rounded-lg 
                                    shadow-sm 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-400 
                                    focus:border-blue-500
                                    transition-all
                                    "
                            >
                                <option value={2}>Formateur</option>
                                <option value={3} >Élève</option>
                            </select>
                        </div>

                        {/* Prof assignation for admin*/}
                        {(form.role_id === 3) && <div className="flex flex-col flex-1">
                            <label htmlFor="role" className="text-gray-600 text-sm font-medium mb-1">
                                Formateur
                            </label>
                            <select
                                name="professor_id"
                                id="professor_id"
                                value={form.professor_id}
                                onChange={handleChange}
                                className="
                                    p-2 
                                    text-gray-800 
                                    text-base 
                                    bg-white 
                                    border border-gray-300 
                                    rounded-lg 
                                    shadow-sm 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-400 
                                    focus:border-blue-500
                                    transition-all
                                    "
                            >
                                {
                                    trainers.map((trainer: user) => <option key={trainer.id} value={trainer.id}>{trainer.name + ' ' + trainer.first_name}</option>)
                                }

                            </select>
                        </div>}

                        {/* Photo de profil */}
                        <div className="flex flex-col flex-1">
                            <label htmlFor="photo" className="text-gray-600 text-sm font-medium mb-1">
                                Photo 
                            </label>
                            <input
                                type="file"
                                name="profil"
                                id="profil"
                                accept="image/*"
                                onChange={handleChange}
                                className="
                                    p-2 
                                    text-gray-700 
                                    bg-white 
                                    border border-gray-300 
                                    rounded-lg 
                                    shadow-sm 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-400 
                                    focus:border-blue-500 
                                    transition-all
                                    "
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    className="mt-2 w-28 h-28 object-cover rounded-full border border-gray-300 shadow-sm"
                                />
                            )}
                        </div>

                    </div>

                    {/* Bouton */}
                    <div className="flex mt-4 justify-center items-center">

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md shadow-blue-300/20"
                        >
                            Créer l'utilisateur
                        </button>
                    </div>
                </form>
            </Card>
        </div>

    );
}