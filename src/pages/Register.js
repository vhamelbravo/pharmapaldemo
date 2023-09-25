import React from "react";
import { Link } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";
function Register() {
  return (
    <div>
      <h1 className="flex justify-center text-5xl font-bold"> Register </h1>
      <NavbarMobile />
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="password"
              className="input input-bordered"
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
            <Link className="my-5" to="/login">
              {" "}
              Already Have an Account? Log In!{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
