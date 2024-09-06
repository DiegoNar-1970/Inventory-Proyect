export const sexOptions = [
    { value: "Masculino", label: "Masculino" },
    { value: "Femenino", label: "Femenino" },
    { value: "other", label: "Otro" },
  ];

export const areaOptions = [
    { value: "almacen", label: "Almacén" },
    { value: "empaque", label: "Empaque" },
    { value: "frio", label: "Fríos" },
    { value: "paletizado", label: "Paletizado" },
    { value: "administracion", label: "administración" },
    { value: "maquina", label: "Máquina" }
  ];
export const validateWeek={
  max: {
    value: 60,
    message: "semanas maximas 60",
  },
  min: {
    value: 1,
    message: "numero no permitido",
  },
  pattern: {
    value: /^(0?[0-9]|1[0-2])$/,
    message: "Ingrese un número válido del 0 al 12",
  }
}
export const shiftOptions = [
  { value: "DIURNO", label: "Diurno" },
  { value: "NOCTURNO", label: "Nocturno" },
  { value: "FESTIVO_DIURNO", label: "Festivo Diurno" },
  { value: "FESTIVO_NOCTURNO", label: "Festivo Nocturno" },
];