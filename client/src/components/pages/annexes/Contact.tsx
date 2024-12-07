import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import Header from '@/components/reusable-ui/Header';
import Footer from '@/components/reusable-ui/Footer';

interface FormData {
  firstName: string;
  lastName: string;
  eMail: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
        const userID = import.meta.env.VITE_EMAILJS_USER_ID;
        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string; 
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
       
      // Données du formulaire
      const emailData = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.eMail, 
        message: data.message,  
      };
  
      // Envoi de l'email via EmailJS
      const response = await emailjs.send(serviceID, templateID, emailData, userID);
  
      if (response.status === 200) {
        alert("Votre message a été envoyé avec succès !");
      } else {
        alert("Une erreur est survenue lors de l’envoi de votre message.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      alert("Impossible d'envoyer votre message. Veuillez réessayer plus tard.");
    }
  };
  
  return (
    <>
      <Header />
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="mx-auto max-w-2xl text-center">Vous avez des questions ?</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">Prénom</label>
              <input
                id="firstName"
                {...register("firstName", { required: "Le prénom est requis",
                    pattern: {
                        value: /^[a-zA-Z]{3,23}$/,
                        message: "Prénom invalide, il faut minimum 3 lettres",
                    },
                 })}
                type="text"
                className="w-full border border-teal-400 rounded-lg p-2 mt-2.5"
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
              <input
                id="lastName"
                {...register("lastName", { required: "Le nom est requis",
                    pattern: {
                        value: /^[a-zA-Z]{2,23}$/,
                        message: "Nom invalide, il faut minimum 2 lettres",
                    },
                })}
                type="text"
                className="w-full border border-teal-400 rounded-lg p-2 mt-2.5"
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="eMail" className="block text-sm font-medium">Adresse mail</label>
              <input
                id="eMail"
                {...register("eMail", {
                  required: "L'adresse mail est requise",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Adresse mail invalide: exemple@gmail.com",
                  },
                })}
                type="email"
                className="w-full border border-teal-400 rounded-lg p-2 mt-2.5"
              />
              {errors.eMail && <span className="text-red-500 text-sm">{errors.eMail.message}</span>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                {...register("message", { required: "Le message est requis" })}
                rows={4}
                className="w-full border border-teal-400 rounded-lg p-2 mt-2.5"
              />
              {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
