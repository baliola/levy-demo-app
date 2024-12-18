/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import type { ReactElement } from "react";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import Images from "@/constants/images";
import { useLevy } from "@/hooks/levy/use_levy";
import type LevyDetail from "@/services/data/response/levy/levy";
import { formatDateOnly } from "@/utils";

const styles = StyleSheet.create({
  document: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    margin: "auto",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 128,
    height: 80,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 15,
  },
  qrContainer: {
    width: "40%",
    alignSelf: "center",
    marginVertical: 15,
  },
  detailsContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailLabel: {
    width: "40%",
    fontWeight: "bold",
    fontSize: 10,
  },
  detailValue: {
    width: "60%",
    fontSize: 10,
  },
  footer: {
    width: "100%",
    marginTop: 15,
  },
});

// Helper component for detail rows
const Item = ({ label, data }: { label: string; data: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{data}</Text>
  </View>
);

const LevyPdf = ({ levyDetail }: { levyDetail: LevyDetail }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <View style={styles.header}>
            <Image src={Images.logoBali} style={styles.logo} />
            <Text style={styles.title}>Levy Voucher!</Text>
            <Text style={styles.subtitle}>
              {`Protect Bali's Paradise: Your Contribution Matters`}
            </Text>

            <View style={styles.qrContainer}>
              <QRCode size={128} value={levyDetail.levy.voucher_code ?? ""} />
            </View>

            <View style={styles.detailsContainer}>
              <Item
                label="No. Passport"
                data={levyDetail.user.no_passport ?? ""}
              />
              <Item label="Name" data={levyDetail.user.name ?? ""} />
              <Item label="Email" data={levyDetail.user.email ?? ""} />
              <Item
                label="Arrival Date"
                data={formatDateOnly(
                  levyDetail.user.arrival_date ?? new Date().toISOString()
                )}
              />
              <Item label="Total Price" data={"Rp 25.000"} />
            </View>
          </View>

          <View style={styles.footer}>
            <Image
              src={Images.levyFooter}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const LevyPage = (): ReactElement => {
  const params = useParams();

  const { levyDetail, setLevyId } = useLevy();

  useEffect(() => {
    setLevyId((params as any).id);
  }, [params]);

  return (
    <div className="p-20 flex flex-col justify-center items-center w-full bg-gray-400">
      {levyDetail?.data && (
        <PDFDownloadLink
          document={<LevyPdf levyDetail={levyDetail?.data} />}
          fileName={`levy-${(params as any).id}.pdf`}
        >
          Download PDF
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default LevyPage;
