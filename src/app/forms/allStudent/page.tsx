import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableStudent from "@/components/TableStudent/TableStudent"
const AllStudent = () => {
    return (
        <div className="h-dvh relative"> 
            <DefaultLayout>
                <Breadcrumb pageName="All Student" />
                
            
<div className="sm:relative absolute overflow-x-auto shadow-md sm:rounded-lg w-[90%] sm:w-full pt-8">
<TableStudent/>
</div>

                
            </DefaultLayout>
        </div>
    )
}

export default AllStudent;
