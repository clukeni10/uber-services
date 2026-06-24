import { Box } from "@chakra-ui/react";
import Header from "../components/header";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Services from "../components/services";
import TopProfessionals from "../components/top_professionals";
import ForProfessionals from "../components/for_professionals";
import { usePageTitle } from "@/app/hooks/usePageTitle";


 
export default function SPA(){
      usePageTitle('Workê');
      return( 
            <Box> 
                  <Header/>
                  <Hero/>
                  <Services />
                  <TopProfessionals />
                  <ForProfessionals />
                  <Footer/>
            </Box>
      )
}