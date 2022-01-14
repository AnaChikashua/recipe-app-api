from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from client.views import LogInView, IndexView, RecipeView

urlpatterns = [
                  path('', LogInView.as_view(), name='login'),
                  path('create/', IndexView.as_view(), name='index'),
                  path('recipes/', RecipeView.as_view(), name='recipes'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
