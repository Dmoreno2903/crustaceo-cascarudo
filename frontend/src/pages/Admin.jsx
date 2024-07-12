import { Contabilidad } from "../components/admin/Contabilidad"
import { AdminMenu } from "../components/admin/AdminMenu"

export const Admin = () => {
    return (
      <div>
        <h1>Panel de administración</h1>
        <Contabilidad/>
        <AdminMenu/>

      </div>
    )
  }