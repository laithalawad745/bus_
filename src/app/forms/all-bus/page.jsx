import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableBus from "@/components/TableBus/TableBus"
const AddBus = () => {
    return (
        <div className="h-dvh relative"> 
            <DefaultLayout>
                <Breadcrumb pageName="All Bus" />
                
            
<div className="sm:relative absolute overflow-x-auto shadow-md sm:rounded-lg w-[90%] sm:w-full pt-8">
<TableBus/>
</div>

                
            </DefaultLayout>
        </div>
    )
}

export default AddBus;
