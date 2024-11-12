import React from 'react';
import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TarjetaCompra = ({ ordenes }) => {
  const navigate = useNavigate();

  const handleVerDetalles = (orden) => {
    navigate('/detalles-orden', { state: { orden } });
  };

  return (
    <>
      {ordenes.map((orden, index) => (
       <Card key={index} className="mb-4">
       <CardHeader>
         <CardTitle>Orden del {orden.fecha}</CardTitle>
       </CardHeader>
       <CardContent>
         <CardDescription>
           <strong>Costo final:</strong> ${orden.precio_total}
         </CardDescription>
       </CardContent>
       <CardFooter className="flex items-center justify-between">
         <Button
           variant="outline"
           onClick={() => handleVerDetalles(orden)}
           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#30182F')}
           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
         >
           Ver detalles
         </Button>
       </CardFooter>
     </Card>
      ))}
    </>
  );
};

TarjetaCompra.propTypes = {
  ordenes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      precio_total: PropTypes.number.isRequired,
      fecha: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TarjetaCompra;
