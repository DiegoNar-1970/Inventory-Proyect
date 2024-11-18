import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { newFormatHour, newFormatShift } from "../../helpers/formatsHours";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "#B0BEC5",
    padding: 10,
    fontSize: 10,
  },
  header: {
    textAlign: "center",
    color: "#1E88E5",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  section: {
    borderBottomWidth: 2,
    borderColor: "#1E88E5",
    padding: 5,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

const ExtraHour = ({ extraHrs }) => {
  if (!extraHrs) return null; // Condicional para evitar errores
  return (
    <View style={styles.flexRow}>
      <Text>Hora Extra {newFormatHour(extraHrs.typeHour)}</Text>
      <View style={styles.flexRow}>
        <Text>{extraHrs.totalHours.toFixed(1)}</Text>
        <Text>{extraHrs.paiForHourComission.toFixed(1)}</Text>
        <Text>{extraHrs.paiOfHours.toFixed(1)}</Text>
        <Text>0</Text>
      </View>
    </View>
  );
};

const HrsComission = ({ info }) => {
  if (!info) return null; // Condicional para evitar errores
  return (
    <View style={styles.flexRow}>
      <Text>Recargo {newFormatShift(info.type)}</Text>
      <View style={styles.flexRow}>
        <Text>{info.hrs}</Text>
        <Text>{info.pai.toFixed(2)}</Text>
        <Text>{info.hrs}</Text>
        <Text>0</Text>
      </View>
    </View>
  );
};

const InfoPaimentPdf = ({ info, startDate, endDate }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>FRUTY GREEN PACKING SAS</Text>
      <Text>Nit: {info.nit}</Text>
      <Text>
        Nómina #{info.numberNomina} correspondiente al periodo del {startDate} al {endDate}
      </Text>

      {/* Employee Info */}
      <View style={styles.section}>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>
            {info.employee.profile.name.toUpperCase()} {info.employee.profile.lastName.toUpperCase()}
          </Text>
          <Text>{info.employee.profile.cc}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Cargo:</Text>
          <Text>{info.employee.area}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Sueldo Básico:</Text>
          <Text>{info.employee.baseSalary}</Text>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.section}>
        {/* Example of Sueldo */}
        <View style={styles.flexRow}>
          <Text>Sueldo</Text>
          <View style={styles.flexRow}>
            <Text>{info.totalHrs.toFixed(1)}</Text>
            <Text>{(info.employee.baseSalary / 184).toFixed(1)}</Text>
            <Text>{info.employee.baseSalary / 2}</Text>
            <Text>0</Text>
          </View>
        </View>

        {/* Extra Hours and Commissions */}
        {info.dayTimeOvertime && <ExtraHour extraHrs={info.dayTimeOvertime} />}
        {info.dayTimeHoliday && <ExtraHour extraHrs={info.dayTimeHoliday} />}
        {info.nightOvertime && <ExtraHour extraHrs={info.nightOvertime} />}
        {info.nightHoliday && <ExtraHour extraHrs={info.nightHoliday} />}
        {info.paiNigthShift && <HrsComission info={info.paiNigthShift} />}
        {info.paiNigthDominicalShift && (
          <HrsComission info={info.paiNigthDominicalShift} />
        )}
      </View>

      {/* Final Totals */}
      <View style={styles.section}>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>Firma del Empleado</Text>
          <Text>____________________</Text>
          <Text style={styles.bold}>Total</Text>
          <Text>{info.totalPaiment}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.bold}>C.C.</Text>
          <Text style={styles.bold}>Neto Pagado</Text>
          <Text>{info.paiOutDeductions.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default InfoPaimentPdf;
