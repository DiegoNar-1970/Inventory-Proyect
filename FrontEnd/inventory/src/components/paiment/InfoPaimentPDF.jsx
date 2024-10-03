import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";
import { newFormatHour, newFormatShift } from "../../helpers/formatsHours";

// Estilos CSS utilizando la API de React PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    flexDirection: "column",
    minWidth: 550,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  borderBlue: {
    borderTopWidth: 2,
    borderTopColor: "blue",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 2,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 260,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  smallText: {
    fontSize: 10,
  },
  signature: {
    textAlign: "left",
    marginTop: 20,
  },
});
const ExtraHour = ({ extraHrs }) => {
  if (!extraHrs) return null;
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
  if (!info) return null;
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
const InfoPaimentPDF = ({ info, startDate, endDate }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.textBold}>FRUTY GREEN PACKING SAS</Text>
            <Text>Nit: {info.nit}</Text>
            <Text>
              Nómina #{info.numberNomina} correspondiente al periodo del{" "}
              {startDate} al {endDate}
            </Text>
          </View>

          <View style={[styles.flexRow, styles.borderBlue]}>
            <Text style={styles.borderBottom}>
              {info.employee.profile.name.toUpperCase()}{" "}
              {info.employee.profile.lastName.toUpperCase()}
            </Text>
            <View style={styles.flexRow}>
              <Text style={styles.borderBottom}>CC</Text>
              <Text style={styles.borderBottom}>
                {info.employee.profile.cc}
              </Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Text style={styles.textBold}>Cargo:</Text>
            <Text>{info.employee.area}</Text>
            <View style={styles.flexRow}>
              <Text style={styles.textBold}>Sueldo Básico:</Text>
              <Text>{info.employee.baseSalary}</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Text style={styles.textBold}>Sueldo:</Text>
            <View style={styles.tableRow}>
              <Text>{info.totalHrs.toFixed(1)}</Text>
              <Text>{(info.employee.baseSalary / 184).toFixed(1)}</Text>
              <Text>{info.employee.baseSalary / 2}</Text>
              <Text>0</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Text>Auxilio de Transporte</Text>
            <View style={styles.tableRow}>
              <Text>{info.totalHrs.toFixed(1)}</Text>
              <Text>{info.auxTransportHrs.toFixed(1)}</Text>
              <Text>{info.auxTransportPai.toFixed(1)}</Text>
              <Text>0</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <Text>Aportes Pensión Trabajador</Text>
            <Text>PORVENIR S.A. AFPC</Text>
            <View style={styles.tableRow}>
              <Text>0</Text>
              <Text>{info.deducctions.pension}</Text>
            </View>
          </View>
          {info.dayTimeOvertime && (
            <ExtraHour extraHrs={info.dayTimeOvertime} />
          )}
          {info.dayTimeHoliday && <ExtraHour extraHrs={info.dayTimeHoliday} />}
          {info.nightOvertime && <ExtraHour extraHrs={info.nightOvertime} />}
          {info.nightHoliday && <ExtraHour extraHrs={info.nightHoliday} />}
          {info.paiNigthShift && <HrsComission info={info.paiNigthShift} />}
          {info.paiNigthDominicalShift && (
            <HrsComission info={info.paiNigthDominicalShift} />
          )}
          <View style={styles.flexRow}>
            <Text>Aportes Salud Trabajador</Text>
            <Text>NUEVA EPS</Text>
            <View style={styles.tableRow}>
              <Text>0</Text>
              <Text>{info.deducctions.salud}</Text>
            </View>
          </View>

          <View style={styles.signature}>
            <Text style={styles.textBold}>Firma del Empleado</Text>
            <Text>__________________</Text>
          </View>

          <View style={styles.flexRow}>
            <Text className={styles.textBold}>Total:</Text>
            <Text>{info.totalPaiment}</Text>
            <Text>{info.deducctions.salud + info.deducctions.pension}</Text>
          </View>

          <View style={styles.flexRow}>
            <Text style={styles.textBold}>Neto Pagado:</Text>
            <Text>{info.paiOutDeductions.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InfoPaimentPDF;
