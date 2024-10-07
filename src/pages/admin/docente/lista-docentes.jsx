import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog"; // Asegúrate de tener esto importado
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import axios from "axios";

const ListaDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [selectedCursos, setSelectedCursos] = useState({});
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docenteToDelete, setDocenteToDelete] = useState(null); // Para el modal de eliminación
  const toast = useRef(null);

  const fetchDocentes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/lista-docente",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al obtener los docentes:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los docentes",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Lista docentes - Crayons";
    fetchDocentes();
  }, []);

  const cursosEnsena = useCallback(
    (rowData) => {
      const cursos = rowData.cursos
        ? rowData.cursos.map((curso) => ({ label: curso, value: curso }))
        : [];

      return (
        <Dropdown
          value={selectedCursos[rowData.dni] || null}
          onChange={(e) =>
            setSelectedCursos((prev) => ({
              ...prev,
              [rowData.dni]: e.value,
            }))
          }
          options={cursos}
          placeholder="Selecciona un curso"
          className="w-full md:w-14rem"
        />
      );
    },
    [selectedCursos]
  );

  const handleEdit = (rowData) => {
    // Redirect to the edit page with the DNI
    window.location.href = `/admin-crayon/editar-docente/${rowData.id}`;
  };

  const handleDelete = async () => {
    if (!docenteToDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/eliminar-docente/${docenteToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Docente eliminado exitosamente",
      });
      fetchDocentes(); // Volver a cargar la lista de docentes
    } catch (error) {
      console.error("Error al eliminar el docente:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar el docente",
      });
    } finally {
      setDocenteToDelete(null); // Cerrar el modal
    }
  };

  const openDeleteDialog = (id) => {
    setDocenteToDelete(id);
  };

  const closeDeleteDialog = () => {
    setDocenteToDelete(null);
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3 conatiner_detalles_accion">
        <div>
          <h5 className="title_detalle_table">
            Cursos enseñados por {data.nombre}
          </h5>
          <div>{cursosEnsena(data)}</div>
        </div>
        <div>
          <h5 className="title_detalle_table">Acción</h5>
          <div className="mt-2 container_btns">
            <Button label="Editar" onClick={() => handleEdit(data)} />
            <Button
              label="Eliminar"
              severity="danger"
              onClick={() => openDeleteDialog(data.id)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      <h3 className="container_lista_docente">Lista de todos los docentes</h3>
      <div className="container_lista_docente">
        <Toast ref={toast} />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable
            value={docentes}
            tableStyle={{ minWidth: "50rem" }}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data ? e.data : [])}
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="dni"
          >
            <Column expander style={{ width: "3em" }} />
            <Column field="nombre" header="Nombres" />
            <Column field="apellidos" header="Apellidos" />
            <Column field="dni" header="DNI" />
            <Column field="telefono" header="Teléfono" />
            <Column field="direccion" header="Dirección" />
          </DataTable>
        )}
      </div>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        visible={!!docenteToDelete}
        style={{ width: "450px" }}
        header="Confirmar eliminación"
        modal
        footer={
          <>
            <Button label="Cancelar" onClick={closeDeleteDialog} />
            <Button label="Eliminar" severity="danger" onClick={handleDelete} />
          </>
        }
        onHide={closeDeleteDialog}
      >
        <p>¿Estás seguro de que deseas eliminar este docente?</p>
      </Dialog>
    </section>
  );
};

export default ListaDocentes;
