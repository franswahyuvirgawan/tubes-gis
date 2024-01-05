import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";

function Region() {
  const store = useUserStore();
  const [dataAllRegion, setDataAllRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataPerUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mregion",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      setDataAllRegion(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPerUser();
  }, []);

  const mapDataWithParent = (
    childData,
    parentData,
    parentIdKey,
    parentNameKey
  ) =>
    childData.map((childItem) => {
      const parentItem = parentData.find(
        (parent) => parent.id === childItem[parentIdKey]
      );
      return {
        [parentNameKey]: parentItem ? parentItem[parentNameKey] : null,
        ...childItem,
      };
    });

  const dataKabupaten =
    dataAllRegion?.kabupaten &&
    dataAllRegion?.provinsi &&
    mapDataWithParent(
      dataAllRegion.kabupaten,
      dataAllRegion.provinsi,
      "prov_id",
      "provinsi"
    );

  const dataKecamatan =
    dataAllRegion?.kecamatan &&
    dataAllRegion?.kabupaten &&
    mapDataWithParent(
      dataAllRegion.kecamatan,
      dataAllRegion.kabupaten,
      "kab_id",
      "kabupaten"
    );

  const dataDesa =
    dataAllRegion?.desa &&
    dataAllRegion?.kecamatan &&
    mapDataWithParent(
      dataAllRegion.desa,
      dataAllRegion.kecamatan,
      "kec_id",
      "kecamatan"
    );

  useEffect(() => {
    setLoading(false);
  }, [dataKabupaten, dataKecamatan, dataDesa, dataAllRegion]);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[120px]">
        {/* Log data proses */}
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data Provinsi
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">provinsi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={2}>
                        <div className="w-full flex flex-row justify-center py-5">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataAllRegion?.provinsi.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <td className="text-center">{item.provinsi}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data kabupaten
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Provinsi</th>
                    <th className="text-center">kabupaten</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataKabupaten?.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.provinsi}</th>
                          <td className="text-center">{item.kabupaten}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data kecamatan
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Kabupaten</th>
                    <th className="text-center">kecamatan</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataKecamatan?.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.kabupaten}</th>
                          <td className="text-center">{item.kecamatan}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data desa
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Kecamatan</th>
                    <th className="text-center">desa</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataDesa?.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.kecamatan}</th>
                          <td className="text-center">{item.desa}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Region;
