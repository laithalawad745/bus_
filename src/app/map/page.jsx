
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SyriaMap from "@/components/maps/SyriaMap"
const map = () => {
    return (
              <div className="max-h-full relative "> 
            <DefaultLayout>
                <SyriaMap/>                
            


                
            </DefaultLayout>
        </div>
    )
}

export default map