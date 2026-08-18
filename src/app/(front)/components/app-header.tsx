import AppButton from "./app-button";

export default function AppHeader() {
  const isShow = true;
  const students = ['John', 'Mary']; // []

  return (
    <div>
        <h1>Hello Header</h1>
        <AppButton />
        <p>Cosci SWU</p>
        {
          students.length > 0 ? <p>พบข้อมูลนักศึกษา</p> : <p>ไม่พบข้อมูล...</p>
        }
        {
          students.length > 0 && <p>นักศึกษาทั้งหมด {students.length} คน</p>
        }
        {
          isShow && <hr />
        }
    </div>
  );
}