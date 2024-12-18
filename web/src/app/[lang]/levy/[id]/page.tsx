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
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useReactToPrint } from "react-to-print";

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
import React, { useEffect, useRef } from "react";
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
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
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
                <div className="flex text-3xl">qr disini</div>
                <QRCode
                  size={128}
                  value={
                    levyDetail.levy.voucher_code ??
                    "https://nbs-explorer.mandalachain.io/tx/0x3d126d9ea3d83d4237758d66cfba1875b60b2d69e1380798d8f14ca4fa94fe8c"
                  }
                />
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
    </div>
  );
};

const DetailItem = (label: string, data: string) => (
  <div className="flex justify-between mb-2">
    <span className="font-bold text-sm w-2/5">{label}:</span>
    <span className="text-sm w-3/5">{data}</span>
  </div>
);

const LevyPage = (): ReactElement => {
  const params = useParams();

  const { levyDetail, setLevyId } = useLevy();

  useEffect(() => {
    setLevyId((params as any).id);
  }, [params]);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Levy_voucer`,
    // onAfterPrint: () => alert('Print Success'),
  });

  return (
    <>
      <div className="p-20 flex flex-col justify-center items-center w-full bg-gray-400">
        {levyDetail?.data && (
          <>
            {/* <PDFDownloadLink
            document={<LevyPdf levyDetail={levyDetail?.data} />}
            fileName={`levy-${(params as any).id}.pdf`}
          >
            Download PDF
          </PDFDownloadLink> */}

            <div className="cursor-pointer" onClick={handlePrint}>
              Download
            </div>
          </>
        )}
      </div>
      {levyDetail?.data && (
        <div
          ref={componentRef}
          className="flex flex-col justify-center items-center"
        >
          {/* <Page size="A4"> */}
          <div className="flex flex-col justify-between bg-white border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex flex-col items-center p-5">
              <img
                src={Images.logoBali}
                alt="Bali Logo"
                className="w-32 h-20 object-contain"
              />
              <h1 className="text-lg font-bold mt-3">Levy Voucher!</h1>
              <p className="text-sm mb-5 text-center">
                Protect Bali's Paradise: Your Contribution Matters
              </p>

              <div className="flex my-4">
                <QRCode
                  size={128}
                  value={
                    levyDetail.data.onchain_url ??
                    "https://nbs-explorer.mandalachain.io/tx/0x3d126d9ea3d83d4237758d66cfba1875b60b2d69e1380798d8f14ca4fa94fe8c"
                  }
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm w-2/5">No Passport:</span>
                  <span className="text-sm">
                    {levyDetail.data.user.no_passport}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm w-2/5">Email:</span>
                  <span className="text-sm">{levyDetail.data.user.email}</span>
                </div>{" "}
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm w-2/5">Name:</span>
                  <span className="text-sm">{levyDetail.data.user.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-sm w-2/5">Arrival Date:</span>
                  <span className="text-sm">
                    <span className="text-sm">
                      {formatDateOnly(
                        levyDetail.data.user.arrival_date ??
                          new Date().toISOString()
                      )}
                    </span>{" "}
                  </span>
                </div>{" "}
              </div>
            </div>

            <div className="w-full mt-4">
              <img
                src={Images.levyFooter}
                alt="Levy Footer"
                className="w-full object-cover"
              />
            </div>
          </div>
          {/* </Page>{" "} */}
        </div>
      )}
    </>
  );
};

export default LevyPage;
