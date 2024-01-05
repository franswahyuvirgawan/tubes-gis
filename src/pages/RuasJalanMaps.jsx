import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import useUserStore from "../store/userStore";
import polyline from "polyline-encoded";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { PuffLoader } from "react-spinners";
import "leaflet/dist/leaflet.css";
import { FeatureGroup, MapContainer, Popup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import haversine from "haversine";
import toast, { Toaster } from "react-hot-toast";
import SelectOptions from "../components/SelectOptions";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const RuasJalanMaps = () => {
  const store = useUserStore();
  const [dataAllDesa, setDataAllDesa] = useState([]);
  const [dataAllProvinsi, setDataAllProvinsi] = useState([]);
  const [dataAllKabupaten, setDataAllKabupaten] = useState([]);
  const [dataAllKecamatan, setDataAllKecamatan] = useState([]);
  const [dataFilterAllDesa, setDataFilterAllDesa] = useState([]);
  const [dataAllEksistingJalan, setDataAllEksistingJalan] = useState([]);
  const [dataAllKondisiJalan, setDataAllKondisiJalan] = useState([]);
  const [dataAllJenisJalan, setDataAllJenisJalan] = useState([]);
  const [dataAllRuasJalan, setDataAllRuasJalan] = useState([]);
  const [valueKodeRuas, setValueKodeRuas] = useState("");
  const [valueRuasJalan, setValueRuasJalan] = useState("");
  const [valueLebar, setValueLebar] = useState("");
  const [valueKeterangan, setValueKeterangan] = useState("");
  const [errors, setErrors] = useState([]);

  // select
  const [valueDesa, setValueDesa] = useState("");
  const [valueProvinsi, setValueProvinsi] = useState("");
  const [valueKabupaten, setValueKabupaten] = useState("");
  const [valueKecamatan, setValueKecamatan] = useState("");
  const [valueEksistingJalan, setValueEksistingJalan] = useState("");
  const [valueKondisiJalan, setValueKondisiJalan] = useState("");
  const [valueJenisJalan, setValueJenisJalan] = useState("");
  const featureGroupRef = useRef();

  const fetchDataEksistingJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/meksisting",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.eksisting,
      }));
      setDataAllEksistingJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGetDataDesa = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mregion",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.desa.map((item) => ({
        value: item.id,
        label: item.desa,
      }));
      setDataAllDesa(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataKondisiJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mkondisi",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.kondisi,
      }));
      setDataAllKondisiJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataJenisJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mjenisjalan",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.jenisjalan,
      }));
      setDataAllJenisJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [renderMap, setRenderMap] = useState(false);
  const fetchDataRuasJalan = async () => {
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/ruasjalan/`,
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      setDataAllRuasJalan(response.data.ruasjalan);
      setRenderMap(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataDesa = async (valueKecamatan) => {
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/desa/${valueKecamatan}`,
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.desa.map((item) => ({
        value: item.id,
        label: item.value,
      }));
      setDataAllDesa(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataProvinsi = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mregion",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.provinsi.map((item) => ({
        value: item.id,
        label: item.provinsi,
      }));
      setDataAllProvinsi(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataKabupaten = async (valueProvinsi) => {
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/kabupaten/${valueProvinsi}`,
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.kabupaten.map((item) => ({
        value: item.id,
        label: item.value,
      }));
      setDataAllKabupaten(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataKecamatan = async (valueKabupaten) => {
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/kecamatan/${valueKabupaten}`,
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.kecamatan.map((item) => ({
        value: item.id,
        label: item.value,
      }));
      setDataAllKecamatan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataEksistingJalan();
    fetchGetDataDesa();
    fetchDataProvinsi();
    fetchDataKondisiJalan();
    fetchDataJenisJalan();
    fetchDataRuasJalan();
  }, []);

  useEffect(() => {
    if (valueProvinsi) {
      fetchDataKabupaten(valueProvinsi);
    }
  }, [valueProvinsi]);

  useEffect(() => {
    if (valueKabupaten) {
      fetchDataKecamatan(valueKabupaten);
    }
  }, [valueKabupaten]);

  useEffect(() => {
    if (valueKecamatan) {
      fetchDataDesa(valueKecamatan);
    }
  }, [valueKecamatan]);

  useEffect(() => {
    setValueKodeRuas(dataAllRuasJalan?.kode_ruas);
    setValueRuasJalan(dataAllRuasJalan?.nama_ruas);
    setValueLebar(dataAllRuasJalan?.lebar);
    setValueKeterangan(dataAllRuasJalan?.keterangan);
  }, [
    dataAllRuasJalan?.kode_ruas,
    dataAllRuasJalan?.nama_ruas,
    dataAllRuasJalan?.lebar,
    dataAllRuasJalan?.keterangan,
  ]);

  const navigate = useNavigate();

  const filteredDataDesaArray = dataAllRuasJalan.map((ruasJalan) => {
    // Assuming ruasJalan.desa_id is the property you want to filter on
    const filteredDataDesa = dataAllDesa.filter(
      (item) => item.value === ruasJalan.desa_id
    );

    // If you want to return the first matching item, you can use filteredDataDesa[0]
    return filteredDataDesa[0];
  });

  // filteredDataDesaArray now contains the filtered data for each ruasJalan element
  const filteredEksistingJalanArray = dataAllRuasJalan.map((ruasJalan) => {
    const filteredEksistingJalan = dataAllEksistingJalan.filter(
      (item) => item.value === ruasJalan.eksisting_id
    );
    return filteredEksistingJalan[0];
  });

  const filteredKondisiJalanArray = dataAllRuasJalan.map((ruasJalan) => {
    const filteredKondisiJalan = dataAllKondisiJalan.filter(
      (item) => item.value === ruasJalan.kondisi_id
    );
    return filteredKondisiJalan[0];
  });

  const filteredJenisJalanArray = dataAllRuasJalan.map((ruasJalan) => {
    const filteredJenisJalan = dataAllJenisJalan.filter(
      (item) => item.value === ruasJalan.jenisjalan_id
    );
    return filteredJenisJalan[0];
  });

  const handleDelete = async (id) => {
    try {
      await fetch(`https://gisapis.manpits.xyz/api/ruasjalan/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${store.userToken}`,
        },
      });
      fetchDataRuasJalan();
    } catch (error) {
      console.log(error);
    }
  };

  const createPopupContent = (ruasJalan, index) => {
    return `<table>
    <div class="py-4">
      <tr>
        <td class="px-3 py-3">Desa</td>
        <td class="px-3 py-3">
          ${filteredDataDesaArray[index]?.label}
        </td>
      </tr>
      <tr>
        <td class="px-3 py-3">Kode Ruas</td>
        <td class="px-3 py-3">${ruasJalan.kode_ruas}</td>
      </tr>
      <tr>
        <td class="px-3 py-3">Nama Ruas</td>
        <td class="px-3 py-3">${ruasJalan.nama_ruas}</td>
      </tr>
      <tr>
        <td class="px-3 py-3">Panjang Jalan</td>
        <td class="px-3 py-3">${`${parseFloat(ruasJalan.panjang).toFixed(
          2
        )} Meter`}</td>
      </tr>
      <tr>
        <td class="px-3 py-3">Lebar Jalan</td>
        <td class="px-3 py-3">${ruasJalan.lebar}</td>
      </tr>
      <tr>
        <td class="px-3 py-3">Eksisting Jalan</td>
        <td class="px-3 py-3">
          ${filteredEksistingJalanArray[index]?.label}
        </td>
      </tr>
      <tr>
        <td class="px-3">Kondisi Jalan</td>
        <td class="">
          <p
            class="${
              filteredKondisiJalanArray[index]?.label === "Baik"
                ? "bg-green-500"
                : filteredKondisiJalanArray[index]?.label === "Sedang"
                ? "bg-orange-500"
                : "bg-red-500"
            } w-min px-4 py-2 rounded-lg text-white"
          >
            ${filteredKondisiJalanArray[index]?.label}
          </p>
        </td>
      </tr>
      <tr>
        <td class="px-3 py-3">Jenis Jalan</td>
        <td class="px-3 py-3">
          ${filteredJenisJalanArray[index]?.label}
        </td>
      </tr>
      <tr>
        <td class="px-3 py-3">Keterangan Jalan</td>
        <td class="px-3 py-3">${ruasJalan.keterangan}</td>
      </tr>
    </div>
  </table>`;
  };

  useEffect(() => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();

      dataAllRuasJalan.forEach((ruasJalan, index) => {
        const decodedCoords = polyline.decode(ruasJalan?.paths);
        const polylineLayer = L.polyline(decodedCoords, {
          color: "blue",
        });

        // Add popup to each polyline layer
        polylineLayer.bindPopup(createPopupContent(ruasJalan, index));

        featureGroupRef.current.addLayer(polylineLayer);
      });
    }
  }, [dataAllRuasJalan]);

  return (
    <MapContainer
      center={[-8.367974233517335, 115.24432224669344]}
      className="Map"
      zoom={10}
      scrollWheelZoom={true}
      style={{ height: "700px", width: "100%", borderRadius: "0px" }}
    >
      <FeatureGroup ref={featureGroupRef}></FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default RuasJalanMaps;
