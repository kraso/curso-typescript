"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Mail, Lock, Camera, Save, ArrowLeft, CheckCircle2, Phone, AtSign } from "lucide-react";
import Link from "next/link";

export default function PerfilPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [alias, setAlias] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    if (user) {
      setNombre(user.user_metadata?.full_name || user.user_metadata?.nombre || "");
      setEmail(user.email || "");
      setAvatar(user.user_metadata?.avatar_url || null);
      setAlias(user.user_metadata?.alias || "");
      setTelefono(user.user_metadata?.phone || "");
    }
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const supabase = createClient();

    // Preview local inmediato
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Subir a Supabase Storage
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      setError("Error al subir imagen: " + error.message);
      return;
    }

    // Obtener URL publica
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    if (data?.publicUrl) {
      // Guardar en metadata del usuario
      await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl },
      });
      setAvatar(data.publicUrl);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    // Update name and profile fields
    const { error: nameError } = await supabase.auth.updateUser({
      data: { full_name: nombre, alias, phone: telefono },
    });

    if (nameError) {
      setError(nameError.message);
      setLoading(false);
      return;
    }

    // Update email if changed
    if (email !== user?.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email,
      });
      if (emailError) {
        setError(emailError.message);
        setLoading(false);
        return;
      }
    }

    setSuccess("Perfil actualizado correctamente");
    await refreshUser();
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    if (newPassword !== confirmPassword) {
      setError("Las contrasenas no coinciden");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("La contrasena debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Contrasena actualizada correctamente");
    setNewPassword("");
    setConfirmPassword("");
    setLoading(false);
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="flex-1 pt-20 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-500 mb-4">Debes iniciar sesion para ver tu perfil</p>
            <Link href="/auth/login" className="text-primary hover:text-primary-dark">
              Iniciar sesion
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 pb-16 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/curso"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Volver al curso
          </Link>

          <h1 className="text-3xl font-bold text-zinc-100 mb-8">Mi Perfil</h1>

          {/* Avatar */}
          <div className="mb-8 p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    nombre.charAt(0).toUpperCase() || "?"
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-dark-700 border border-zinc-600 flex items-center justify-center cursor-pointer hover:bg-dark-600 transition-colors">
                  <Camera size={14} className="text-zinc-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-lg font-medium text-zinc-100">{nombre || "Sin nombre"}</p>
                <p className="text-sm text-zinc-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-6 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleUpdateProfile} className="mb-8 p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Informacion personal</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Nombre
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                {email !== user.email && (
                  <p className="mt-1 text-xs text-warning">
                    Se enviara un email de confirmacion al nuevo correo.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Alias
                </label>
                <div className="relative">
                  <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Tu alias"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Telefono
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Tu telefono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>

          {/* Password Form */}
          <form onSubmit={handleUpdatePassword} className="p-6 rounded-2xl border border-zinc-700/30 bg-dark-800/50">
            <h2 className="text-lg font-semibold text-zinc-100 mb-4">Cambiar contrasena</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Nueva contrasena
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Minimo 6 caracteres"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Confirmar contrasena
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Repite la contrasena"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !newPassword}
              className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-dark-700 text-zinc-200 border border-zinc-600 rounded-lg font-medium hover:bg-dark-600 transition-colors disabled:opacity-50"
            >
              <Lock size={16} />
              {loading ? "Actualizando..." : "Actualizar contrasena"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
