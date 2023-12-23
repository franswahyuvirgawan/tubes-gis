import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import useUserStore from "../store/userStore";
import polyline from "polyline-encoded";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import haversine from "haversine";
import toast, { Toaster } from "react-hot-toast";
import SelectOptions from "../components/SelectOptions";
import Input from "../components/Input";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const Tambah = () => {
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

  // Select
  const [valueDesa, setValueDesa] = useState("");
  const [valueProvinsi, setValueProvinsi] = useState("");
  const [valueKabupaten, setValueKabupaten] = useState("");
  const [valueKecamatan, setValueKecamatan] = useState("");
  const [valueEksistingJalan, setValueEksistingJalan] = useState("");
  const [valueKondisiJalan, setValueKondisiJalan] = useState("");
  const [valueJenisJalan, setValueJenisJalan] = useState("");

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

  useEffect(() => {
    fetchDataProvinsi();
    fetchDataEksistingJalan();
    fetchDataKondisiJalan();
    fetchDataJenisJalan();
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

  const featureGroupRef = useRef();
  const [decodePolylines, setDecodePolylines] = useState([]);
  const [valueCreated, setValueCreated] = useState([]);

  const onCreated = (e) => {
    const marker = e.layer;
    const coordinates = marker.getLatLngs().map((latLng) => ({
      lat: latLng.lat,
      lng: latLng.lng,
    }));

    const encodedPolyline = polyline.encode(
      coordinates.map((coord) => [coord.lat, coord.lng])
    );

    setValueCreated(encodedPolyline);
  };

  useEffect(() => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
      const decodedCoords = polyline.decode(valueCreated);
      const polylineLayer = L.polyline(decodedCoords, {
        color: "blue",
      });
      featureGroupRef.current.addLayer(polylineLayer);
      if (Array.isArray(decodedCoords) && decodedCoords.length > 0) {
        setDecodePolylines(decodedCoords);
      }
    }
  }, [valueCreated]);

  const [editedData, setEditedData] = useState([]);
  const onEdited = (e) => {
    const editedLayers = e.layers.getLayers();
    const data = editedLayers.map((layer) =>
      layer.getLatLngs().map((point) => ({ lat: point.lat, lng: point.lng }))
    );
    const convertedData = data.map((coordinatesArray) =>
      coordinatesArray.map(({ lat, lng }) => [lat, lng])
    );

    const encode = polyline.encode(convertedData[0]);
    setValueCreated(encode);
  };

  const calculateDistance = (coord1, coord2) => {
    const start = { latitude: coord1[0], longitude: coord1[1] };
    const end = { latitude: coord2[0], longitude: coord2[1] };
    const distance = haversine(start, end, { unit: "meter" });
    return distance;
  };

  const calculateDistances = (points) => {
    const distances = [];
    for (let i = 0; i < points.length - 1; i++) {
      const distance = calculateDistance(points[i], points[i + 1]);
      distances.push(distance);
    }
    return distances;
  };

  const distances = calculateDistances(decodePolylines);

  const [jarak, setJarak] = useState(0);

  useEffect(() => {
    for (let i = 0; i < distances.length; i++) {
      setJarak(distances[i]);
    }
  }, [valueCreated, decodePolylines]);

  const navigate = useNavigate();
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      paths: valueCreated,
      desa_id: valueDesa,
      kode_ruas: valueKodeRuas,
      nama_ruas: valueRuasJalan,
      panjang: jarak,
      lebar: Number(valueLebar),
      eksisting_id: valueEksistingJalan,
      kondisi_id: valueKondisiJalan,
      jenisjalan_id: valueJenisJalan,
      keterangan: valueKeterangan,
    };
    setErrors({});
    const inputErrors = {};
    if (!valueProvinsi) {
      inputErrors.valueProvinsi = "Silahkan isi provinsi";
    }
    if (!valueKabupaten) {
      inputErrors.valueKabupaten = "Silahkan isi kabupaten";
    }
    if (!valueKecamatan) {
      inputErrors.valueKecamatan = "Silahkan isi kecamatan";
    }
    if (!valueDesa) {
      inputErrors.valueDesa = "Silahkan isi desa";
    }
    if (!valueKodeRuas) {
      inputErrors.valueKodeRuas = "Silahkan isi kode ruas";
    }
    if (!valueRuasJalan) {
      inputErrors.valueRuasJalan = "Silahkan isi nama ruas";
    }
    if (!jarak) {
      inputErrors.jarak = "Silahkan isi ruas lokasi";
    }
    if (!valueLebar) {
      inputErrors.valueLebar = "Silahkan isi lebar";
    } else if (isNaN(valueLebar)) {
      inputErrors.valueLebar = "Silahkan isi dengan angka";
    }
    if (!valueEksistingJalan) {
      inputErrors.valueEksistingJalan = "Silahkan isi eksisting jalan";
    }
    if (!valueKondisiJalan) {
      inputErrors.valueKondisiJalan = "Silahkan isi kondisi jalan";
    }
    if (!valueJenisJalan) {
      inputErrors.valueJenisJalan = "Silahkan isi jenis jalan";
    }
    if (!valueKeterangan) {
      inputErrors.valueKeterangan = "Silahkan isi keterangan";
    }
    if (Object.keys(inputErrors).length > 0) {
      toast.error("Harap perhatikan form");
      setErrors(inputErrors);
      return;
    }
    try {
      await axios.post("https://gisapis.manpits.xyz/api/ruasjalan", data, {
        headers: {
          Authorization: `Bearer ${store.userToken}`,
        },
      });
      navigate("/ruas-jalan");
    } catch (error) {
      console.log(error);
    }
  };

  const region = [
    {
      title: "Provinsi",
      data: dataAllProvinsi,
      setValue: setValueProvinsi,
      errors: errors?.valueProvinsi,
    },
    {
      title: "Kabupaten",
      data: dataAllKabupaten,
      setValue: setValueKabupaten,
      errors: errors?.valueKabupaten,
    },
    {
      title: "Kecamatan",
      data: dataAllKecamatan,
      setValue: setValueKecamatan,
      errors: errors?.valueKecamatan,
    },
    {
      title: "Desa",
      data: dataAllDesa,
      setValue: setValueDesa,
      errors: errors?.valueDesa,
    },
    {
      title: "Eksisting Jalan",
      data: dataAllEksistingJalan,
      setValue: setValueEksistingJalan,
      errors: errors?.valueEksistingJalan,
    },
    {
      title: "Kondisi Jalan",
      data: dataAllKondisiJalan,
      setValue: setValueKondisiJalan,
      errors: errors?.valueKondisiJalan,
    },
    {
      title: "Jenis Jalan",
      data: dataAllJenisJalan,
      setValue: setValueJenisJalan,
      errors: errors?.valueJenisJalan,
    },
  ];

  const regionInput = [
    {
      placeholder: "Kode Ruas",
      setValue: setValueKodeRuas,
      value: valueKodeRuas,
      errors: errors?.valueKodeRuas,
    },
    {
      placeholder: "Nama Ruas",
      setValue: setValueRuasJalan,
      value: valueRuasJalan,
      errors: errors?.valueRuasJalan,
    },
    {
      placeholder: "Lebar",
      setValue: setValueLebar,
      value: valueLebar,
      errors: errors?.valueLebar,
    },
    {
      placeholder: "Keterangan",
      setValue: setValueKeterangan,
      value: valueKeterangan,
      errors: errors?.valueKeterangan,
    },
  ];

  return (
    <div
      className={
        "text-xs flex justify-center flex-col items-center gap-[100px]"
      }
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center flex-col font-martian text-white gap-[50px]">
        <MapContainer
          className="Map"
          center={{ lat: -8.60355596857304, lng: 115.25943918278261 }}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "1000px", borderRadius: "0px" }}
        >
          <FeatureGroup ref={featureGroupRef}>
            <EditControl
              onCreated={onCreated}
              onEdited={onEdited}
              // onDeleted={onDeleted}
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: true,
                polygon: false,
              }}
            />
          </FeatureGroup>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
      <div className="flex flex-col gap-[20px] justify-start items-center w-[70%] px-[70px]">
        {region.map((item, key) => (
          <SelectOptions
            key={key}
            errors={item.errors}
            title={item.title}
            data={item.data}
            setValue={item.setValue}
          />
        ))}
        {regionInput.map((item, key) => (
          <Input
            key={key}
            errors={item.errors}
            value={item.value}
            placeholder={item.placeholder}
            setValue={item.setValue}
          />
        ))}
        <div className="flex flex-col gap-2 w-full">
          <input
            value={jarak + " meter"}
            disabled
            type="text"
            placeholder="Panjang"
            className="input input-xs h-11 input-bordered lg:w-full w-full"
          />
          {errors?.jarak && (
            <p className="px-2 text-red-500 text-xs">{errors?.jarak}</p>
          )}
        </div>
        <button
          onClick={handleAdd}
          to="/ruas-jalan"
          className="w-full btn btn-xs p-5 btn-primary flex flex-col items-center"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Tambah;
