import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Register = ({setislogin}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For file uploads, use FormData to send binary files to your Node/Express backend
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('username', formData.username);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    if (avatar) {
      submitData.append('avatar', avatar);
    }
    setislogin(true)
    // Handle registration API call logic here
    console.log('Form submitted!');
  };

  return (
    <div className="flex flex-col justify-center mt-10 mb-10 self-center items-center px-10 py-5 text-white min-h-[90vh]">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col px-10 py-8 bg-zinc-900 rounded-md gap-1 w-full max-w-md shadow-lg"
        encType="multipart/form-data"
      >
        <h1 className="text-4xl font-bold tracking-tight text-center mb-2">Create Account</h1>
        <p className="text-zinc-400 text-center mb-6">Join Chatlify today</p>

        {/* Avatar Upload Field */}
        <div className="flex flex-col items-center mb-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center cursor-pointer overflow-hidden hover:border-blue-500 transition-colors relative group"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-zinc-400 text-center px-2">Upload Avatar</span>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium">Change</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Full Name */}
        <label htmlFor="fullName" className="text-sm font-medium text-zinc-300 mb-1">
          Full Name
        </label>
        <input 
          id="fullName"
          type="text" 
          placeholder="John Doe" 
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="bg-zinc-800 outline-none px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-4" 
        />

        {/* Username */}
        <label htmlFor="username" className="text-sm font-medium text-zinc-300 mb-1">
          Username
        </label>
        <input 
          id="username"
          type="text" 
          placeholder="johndoe123" 
          value={formData.username}
          onChange={handleInputChange}
          required
          className="bg-zinc-800 outline-none px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-4" 
        />

        {/* Email */}
        <label htmlFor="email" className="text-sm font-medium text-zinc-300 mb-1">
          Email
        </label>
        <input 
          id="email"
          type="email" 
          placeholder="name@example.com" 
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-zinc-800 outline-none px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-4" 
        />

        {/* Password */}
        <label htmlFor="password" className="text-sm font-medium text-zinc-300 mb-1">
          Password
        </label>
        <input 
          id="password"
          type="password" 
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleInputChange}
          required
          className="bg-zinc-800 outline-none px-5 py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-all mb-6" 
        />

        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 active:scale-[0.98]"
        >
          Register
        </button>
        <p className='text-center mt-3'>Already have an account? <Link className='text-blue-400' to={'/login'}> Login</Link> </p>
        
      </form>
    </div>
  );
};

export default Register;
