import { useEffect, useState } from "react";
import { BuilderComponent, builder, Builder } from '@builder.io/react';

builder.init('67b2e342dd0d44cc8d28efc40c91ada5')

interface FormElements {
    email: HTMLInputElement;
}

export const Newsletter = () => {
    const [builderContentJson, setBuilderContentJson] = useState(null);
    const [email, setEmail] = useState('');
    const [submitMessage, setSubmitMessage] = useState<null | string>(null);
    const [submitStatus, setSubmitStatus]  = useState<null | string>(null);


    useEffect(() => { 
        builder.get('newsletter', { entry: '67b2e342dd0d44cc8d28efc40c91ada5_19d1c826552742b78e0aa406da2eded5' })
        .promise().then(setBuilderContentJson);
    }, []);

    async function onSubmit(
        event: React.FormEvent<HTMLFormElement & FormElements>,
      ) {
        event.preventDefault();
    
        const response = await callApi({
          email
        });
        
        if (response.customer.id) {
            setSubmitMessage(`Subscribe successfully, id: ${response.customer.id}`);
            setSubmitStatus('success');
        } else {
            setSubmitMessage(response.customer.customerUserErrors);
            setSubmitStatus('error');
        }
      }
    return (
        builderContentJson && (
            <form noValidate onSubmit={onSubmit}>
                {submitMessage && (
                    <div className={`flex items-center justify-center mb-6 rounded ${submitStatus === 'success' ? 'bg-green-100': 'bg-red-100'}`}>
                    <p className={`m-4 text-sm ${submitStatus === 'success' ? 'text-primary': 'text-red-900'}`}>{submitMessage}</p>
                    </div>
                )}
                <BuilderComponent
                    model="newsletter"
                    content={builderContentJson}
                    context={{setEmailValue: (event: any) => {
                        setEmail(event.target.value)
                    }}}
                />
            </form>
        )
    );
}

export async function callApi({
    email
  }: {
    email: string;
  }) {
    try {
      const res = await fetch(`/api/newsletter`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
  
      if (res.ok) {
        return res.json();
      } else {
        return {};
      }
    } catch (error: any) {
      return {
        error: error.toString(),
      };
    }
}
