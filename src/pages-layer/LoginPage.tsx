import {type SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMeQuery} from "../features-layer/auth-slice/model/useMeQuery.tsx";
import {useNavigate} from "react-router";
import {useLoginMutation} from "../features-layer/auth-slice/model/useLoginMutation.ts";

const schema = z.object({
    login: z.string({message: 'SHould be a string'}).min(1),
    password: z.string().min(3, "Минимум 3 символов"),
});

type LoginFormInputs = z.infer<typeof schema>;

export const LoginPage = () => {
    const {data} = useMeQuery();
    const {mutateAsync} = useLoginMutation();

    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
        setError
    } = useForm<LoginFormInputs>(
        {
            resolver: zodResolver(schema)
        }
    )

    const myHandleSubmitWithMyLogic: SubmitHandler<LoginFormInputs> = async (inputs) => {
        try {
            const data = await mutateAsync(inputs);
            navigate('/profile/' + data!.userId);
        } catch {
            setError('login', {
                message: 'Incorrect login or password'
            })
        }

        // try {
        //     if (data.isError) {
        //         setError('login', {
        //             message: 'Incorrect login or password'
        //         })
        //     } else {
        //         navigate('/profile/' + data.data!.userId);
        //     }
        //
        // } catch(error) {
        //     console.log(error)
        // }
    };

    if (data) return <div>go away from login</div>

     return (
        <form onSubmit={handleSubmit(myHandleSubmitWithMyLogic)}>
            <div>
                <input {...register('login', {required: true})} />
                { errors.login && <span>{errors.login.message}</span>}
            </div>

            <div>
                <input type={'password'} {...register('password', {required: true})}  />
                { errors.password && <span>{errors.password.message}</span>}
            </div>

            <button type="submit">Login</button>
        </form>
    );
};
