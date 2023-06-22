import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocalLogin from "../shared/socialLogin/SocalLogin";

const SignUp = () => {
  const { createUser, updatUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updatUserProfile(data.name, data.photoUrl)
        .then(() => {
          const saveUser={name:data.name,email:data.email}
          // console.log("user profile upfdate");
          fetch("https://bistro-boss-server-eight-zeta.vercel.app/users",{
            method:"POST",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(saveUser)
          })
          .then(res=>res.json())
          .then(data=>{
            if (data.insertedId) {
              reset();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Sign Up successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/')
            }
          })
          
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  {...register("photoUrl", { required: true })}
                  type="text"
                  placeholder="photoUrl"
                  className="input input-bordered"
                />
                {errors.photoUrl && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">6 chatacter</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">less than 20 chatacter</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    one lower,one upper and one special
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sing Up"
                />
              </div>
            </form>
            <p>
              <small>
                Already have an account <Link to="/login">Login</Link>
              </small>
              <SocalLogin></SocalLogin>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
