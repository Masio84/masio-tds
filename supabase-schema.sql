-- Copia y pega esto en el SQL Editor de tu proyecto en Supabase (https://supabase.com/dashboard)
-- para crear la tabla necesaria para recibir los contactos de la Landing Page.

CREATE TABLE public.leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- (Opcional) Si quieres habilitar Row Level Security, pero estamos usando el Service Role
-- en el backend de Next.js, por lo que no es estrictamente necesario habilitarlo.
-- ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
