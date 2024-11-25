import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { editarDatosPersonales } from '@/services/servicePerfil';


export default function DatosPersonales({ user: propUser }) {
    const { user: authUser, updateUser } = useContext(AuthContext); 
    const [editUser, setEditUser] = useState(propUser);
    const [updateStatus, setUpdateStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({
          ...editUser,
          [name]: value
        });
      };

      const handleSave = async () => {
        // Llamar a editarDatosPersonales y esperar el resultado
        const success = await editarDatosPersonales(editUser);
    
        // Si el resultado es exitoso, actualizar el contexto del usuario
        if (success) {
            updateUser(editUser); // Actualizar el usuario solo si no hay error
            setUpdateStatus('Perfil actualizado correctamente');
        } else {
            setUpdateStatus('Failed to update'); // Actualizar el estado de error
        }
    };
    

    

return (
    <div className="px-4 space-y-6 md:px-6">
    <div className="flex items-center space-x-4">
      <img
        src="https://img.pikbest.com/png-images/qiantu/zodiac-monkey-cartoon-cute-avatar_2510471.png!sw800"
        alt="Avatar"
        width="96"
        height="96"
        className="border rounded-full"
        style={{ aspectRatio: "96/96", objectFit: "cover" }}
      />
    </div>
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Editar Perfil</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>Modifica los datos de tu perfil en los campos a continuación.</DialogDescription> 
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name" className="sr-only">
                Nombre
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={editUser.nombre}
                onChange={handleChange}
              />
              <Input
                id="apellido"
                name="apellido"
                value={editUser.apellido}
                onChange={handleChange}
              />
              <Input
                id="email"
                name="email"
                value={editUser.mail}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={handleSave}>
                Actualizar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">User</Label>
            <p>{authUser.nombreUsuario}</p>
          </div>
          <div>
            <Label htmlFor="name">Nombre</Label>
            <p>{authUser.nombre}</p>
          </div>
          <div>
            <Label htmlFor="name">Apellido</Label>
            <p>{authUser.apellido}</p>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <p>{authUser.mail}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
