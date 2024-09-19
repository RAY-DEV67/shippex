import { useState, useEffect } from "react";
import axios from "axios";

interface Shipment {
  id: string;
  awb: string;
  origin: string;
  destination: string;
  status: string;
  originStreet: string;
  destinationStreet: string;
}

const API_URL = "https://shippex-demo.bc.brandimic.com/api/method/frappe.client.get_list";

export const useShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          doctype: "AWB Status",
          fields: JSON.stringify(["*"]),
        },
      });

      const { data } = response;
      if (data && data.message) {
        setShipments(data.message); // assuming the list of shipments is in the "message" field
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch shipments");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return { shipments, loading, error, refetch: fetchShipments };
};
